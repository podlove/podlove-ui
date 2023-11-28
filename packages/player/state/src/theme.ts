import { compose, propOr, prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { createObject } from '@podlove/utils/helper';
import {
  PodloveTheme,
  PodloveThemeTokens,
  PodloveWebPlayerEpisode
} from '@podlove/types';

import { theme } from '@podlove/player-config';
import { constructed, constructedPayload } from '@podlove/player-actions/lifecycle';
import { setTheme } from '@podlove/player-actions/theme';
import { setThemePayload } from '@podlove/player-actions/theme';

export type State = PodloveTheme;

const TOKENS: PodloveThemeTokens = {
  brand: '#E64415',
  brandDark: '#235973',
  brandDarkest: '#1A3A4A',
  brandLightest: '#E9F1F5',
  shadeDark: '#807E7C',
  shadeBase: '#807E7C',
  contrast: '#000',
  alt: '#fff'
};

export const tokens = {
  brand: propOr(TOKENS.brand, 'brand') as (input: PodloveThemeTokens) => string,
  brandDark: propOr(TOKENS.brandDark, 'brandDark') as (
    input: PodloveThemeTokens
  ) => string,
  brandDarkest: propOr(TOKENS.brandDarkest, 'brandDarkest') as (
    input: PodloveThemeTokens
  ) => string,
  brandLightest: propOr(TOKENS.brandLightest, 'brandLightest') as (
    input: PodloveThemeTokens
  ) => string,
  shadeDark: propOr(TOKENS.shadeDark, 'shadeDark') as (
    input: PodloveThemeTokens
  ) => string,
  shadeBase: propOr(TOKENS.shadeBase, 'shadeBase') as (
    input: PodloveThemeTokens
  ) => string,
  contrast: propOr(TOKENS.contrast, 'contrast') as (input: PodloveThemeTokens) => string,
  alt: propOr(TOKENS.alt, 'alt') as (input: PodloveThemeTokens) => string
};

const getTokens = propOr({}, 'tokens');

const extractTokens = createObject({
  brand: compose(tokens.brand, getTokens, theme),
  brandDark: compose(tokens.brandDark, getTokens, theme),
  brandDarkest: compose(tokens.brandDarkest, getTokens, theme),
  brandLightest: compose(tokens.brandLightest, getTokens, theme),
  shadeDark: compose(tokens.shadeDark, getTokens, theme),
  shadeBase: compose(tokens.shadeBase, getTokens, theme),
  contrast: compose(tokens.contrast, getTokens, theme),
  alt: compose(tokens.alt, getTokens, theme)
}) as (input: PodloveWebPlayerEpisode) => PodloveThemeTokens;

export const INITIAL_STATE: State = {
  tokens: TOKENS
};

export const reducer = handleActions<State, constructedPayload | setThemePayload>(
  {
    [constructed.toString()]: (_, { payload }: Action<constructedPayload>) => ({
      tokens: extractTokens(payload)
    }),
    [setTheme.toString()]: (_, { payload }: Action<setThemePayload>) => ({
      tokens: extractTokens(payload)
    })
  },
  INITIAL_STATE
);

const themeColors = propOr({}, 'tokens') as (input: State) => PodloveThemeTokens;

export const selectors = {
  brand: compose(prop('brand'), themeColors) as (input: State) => string,
  brandDark: compose(prop('brandDark'), themeColors) as (input: State) => string,
  brandDarkest: compose(prop('brandDarkest'), themeColors) as (input: State) => string,
  brandLightest: compose(prop('brandLightest'), themeColors) as (input: State) => string,
  shadeDark: compose(prop('shadeDark'), themeColors) as (input: State) => string,
  shadeBase: compose(prop('shadeBase'), themeColors) as (input: State) => string,
  contrast: compose(prop('contrast'), themeColors) as (input: State) => string,
  alt: compose(prop('alt'), themeColors) as (input: State) => string
};
