import { compose, propOr, path, prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { createObject } from '@podlove/utils/helper';
import {
  PodloveWebPlayerConfig,
  PodloveWebPlayerTheme,
  PodloveWebPlayerThemeTokens,
  PodloveWebPlayerThemeFont
} from '@podlove/types';

import { theme } from '@podlove/player-config';
import { constructed, constructedPayload } from '@podlove/player-actions/lifecycle';
import { setTheme } from '@podlove/player-actions/theme';
import { setThemePayload } from '@podlove/player-actions/theme';

export type State = PodloveWebPlayerTheme;

const TOKENS: PodloveWebPlayerThemeTokens = {
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
  brand: propOr(TOKENS.brand, 'brand') as (input: PodloveWebPlayerThemeTokens) => string,
  brandDark: propOr(TOKENS.brandDark, 'brandDark') as (
    input: PodloveWebPlayerThemeTokens
  ) => string,
  brandDarkest: propOr(TOKENS.brandDarkest, 'brandDarkest') as (
    input: PodloveWebPlayerThemeTokens
  ) => string,
  brandLightest: propOr(TOKENS.brandLightest, 'brandLightest') as (
    input: PodloveWebPlayerThemeTokens
  ) => string,
  shadeDark: propOr(TOKENS.shadeDark, 'shadeDark') as (
    input: PodloveWebPlayerThemeTokens
  ) => string,
  shadeBase: propOr(TOKENS.shadeBase, 'shadeBase') as (
    input: PodloveWebPlayerThemeTokens
  ) => string,
  contrast: propOr(TOKENS.contrast, 'contrast') as (input: PodloveWebPlayerThemeTokens) => string,
  alt: propOr(TOKENS.alt, 'alt') as (input: PodloveWebPlayerThemeTokens) => string
};

export const FONTS: { [key: string]: PodloveWebPlayerThemeFont } = {
  ci: {
    name: 'ci',
    family: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji", "Segoe UI Symbol'
    ],
    src: [],
    weight: 800
  },
  regular: {
    name: 'regular',
    family: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji", "Segoe UI Symbol'
    ],
    src: [],
    weight: 300
  },
  bold: {
    name: 'bold',
    family: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji", "Segoe UI Symbol'
    ],
    src: [],
    weight: 700
  }
};

const normalizeFont = (type: string) =>
  createObject({
    family: propOr(path([type, 'family'], FONTS), 'family'),
    weight: propOr(path([type, 'weight'], FONTS), 'weight'),
    name: propOr(path([type, 'name'], FONTS), 'name'),
    src: propOr([], 'src')
  }) as (input: PodloveWebPlayerThemeFont) => PodloveWebPlayerThemeFont;

const extractFonts = createObject({
  regular: compose(
    normalizeFont('regular'),
    propOr(FONTS.regular, 'regular'),
    propOr({}, 'fonts'),
    theme
  ),
  bold: compose(normalizeFont('bold'), propOr(FONTS.bold, 'bold'), propOr({}, 'fonts'), theme),
  ci: compose(normalizeFont('ci'), propOr(FONTS.ci, 'ci'), propOr({}, 'fonts'), theme)
}) as (input: { theme: PodloveWebPlayerTheme }) => {
  regular: PodloveWebPlayerThemeFont;
  bold: PodloveWebPlayerThemeFont;
  ci: PodloveWebPlayerThemeFont;
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
}) as (input: { theme: PodloveWebPlayerTheme }) => PodloveWebPlayerThemeTokens;

export const INITIAL_STATE: State = {
  tokens: TOKENS,
  fonts: FONTS
};

export const reducer = handleActions<State, constructedPayload | setThemePayload>(
  {
    [constructed.toString()]: (_, { payload }: Action<constructedPayload>) => ({
      tokens: extractTokens(payload),
      fonts: extractFonts(payload)
    }),
    [setTheme.toString()]: (_, { payload }: Action<setThemePayload>) => ({
      tokens: extractTokens(payload),
      fonts: extractFonts(payload)
    })
  },
  INITIAL_STATE
);

const themeColors = propOr({}, 'tokens') as (input: State) => PodloveWebPlayerThemeTokens;
const themeFonts = propOr({}, 'fonts') as (input: State) => {
  [key: string]: PodloveWebPlayerThemeFont;
};

export const selectors = {
  brand: compose(prop('brand'), themeColors) as (input: State) => string,
  brandDark: compose(prop('brandDark'), themeColors) as (input: State) => string,
  brandDarkest: compose(prop('brandDarkest'), themeColors) as (input: State) => string,
  brandLightest: compose(prop('brandLightest'), themeColors) as (input: State) => string,
  shadeDark: compose(prop('shadeDark'), themeColors) as (input: State) => string,
  shadeBase: compose(prop('shadeBase'), themeColors) as (input: State) => string,
  contrast: compose(prop('contrast'), themeColors) as (input: State) => string,
  alt: compose(prop('alt'), themeColors) as (input: State) => string,
  fontRegular: compose(prop('regular'), themeFonts) as (input: State) => PodloveWebPlayerThemeFont,
  fontBold: compose(prop('bold'), themeFonts) as (input: State) => PodloveWebPlayerThemeFont,
  fontCi: compose(prop('ci'), themeFonts) as (input: State) => PodloveWebPlayerThemeFont
};
