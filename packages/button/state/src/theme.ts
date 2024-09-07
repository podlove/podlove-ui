import { flow, get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';
import { createObject } from '@podlove/utils/helper';
import type { PodloveTheme, PodloveThemeTokens } from '@podlove/types';
import { init, initPayload } from '@podlove/button-actions/lifecycle';

const theme = (input: initPayload): PodloveTheme => get(input, 'theme', {} as PodloveTheme);

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
  brand: (input: PodloveThemeTokens): string => get(input, 'brand', TOKENS.brand),
  brandDark: (input: PodloveThemeTokens): string => get(input, 'brandDark', TOKENS.brandDark),
  brandDarkest: (input: PodloveThemeTokens): string =>
    get(input, 'brandDarkest', TOKENS.brandDarkest),
  brandLightest: (input: PodloveThemeTokens): string =>
    get(input, 'brandLightest', TOKENS.brandLightest),
  shadeDark: (input: PodloveThemeTokens): string => get(input, 'shadeDark', TOKENS.shadeDark),
  shadeBase: (input: PodloveThemeTokens): string => get(input, 'shadeBase', TOKENS.shadeBase),
  contrast: (input: PodloveThemeTokens): string => get(input, 'contrast', TOKENS.contrast),
  alt: (input: PodloveThemeTokens): string => get(input, 'alt', TOKENS.alt)
};

const getTokens = (input: PodloveThemeTokens) => get(input, 'tokens', {});

const extractTokens = createObject({
  brand: flow(theme, getTokens, tokens.brand),
  brandDark: flow(theme, getTokens, tokens.brandDark),
  brandDarkest: flow(theme, getTokens, tokens.brandDarkest),
  brandLightest: flow(theme, getTokens, tokens.brandLightest),
  shadeDark: flow(theme, getTokens, tokens.shadeDark),
  shadeBase: flow(theme, getTokens, tokens.shadeBase),
  contrast: flow(theme, getTokens, tokens.contrast),
  alt: flow(theme, getTokens, tokens.alt)
}) as (input: initPayload) => PodloveThemeTokens;

export interface State {
  tokens: PodloveThemeTokens;
}

export const INITIAL_STATE: State = {
  tokens: TOKENS
};

export const reducer = handleActions<State, initPayload>(
  {
    [init.toString()]: (_, { payload }: Action<initPayload>): State => ({
      tokens: extractTokens(payload)
    })
  },
  INITIAL_STATE
);

const themeColors = (key: keyof PodloveThemeTokens) => (input: State): string | null => get(input, ['tokens', key], null);

export const selectors = {
  brand: themeColors('brand'),
  brandDark: themeColors('brandDark'),
  brandDarkest: themeColors('brandDarkest'),
  brandLightest: themeColors('brandLightest'),
  shadeDark: themeColors('shadeDark'),
  shadeBase: themeColors('shadeBase'),
  contrast: themeColors('contrast'),
  alt: themeColors('alt'),
};
