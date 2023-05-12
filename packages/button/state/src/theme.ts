import { createSelector } from 'reselect';
import { prop, compose, propOr, path } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { createObject } from '@podlove/utils/helper';
import type { PodloveThemeTokens, PodloveThemeFont } from '@podlove/types';
import { init, initPayload } from '@podlove/button-actions/lifecycle';

const theme = propOr({}, 'theme');

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
  brand: propOr(TOKENS.brand, 'brand'),
  brandDark: propOr(TOKENS.brandDark, 'brandDark'),
  brandDarkest: propOr(TOKENS.brandDarkest, 'brandDarkest'),
  brandLightest: propOr(TOKENS.brandLightest, 'brandLightest'),
  shadeDark: propOr(TOKENS.shadeDark, 'shadeDark'),
  shadeBase: propOr(TOKENS.shadeBase, 'shadeBase'),
  contrast: propOr(TOKENS.contrast, 'contrast'),
  alt: propOr(TOKENS.alt, 'alt')
};

export const FONTS: { [key: string]: PodloveThemeFont } = {
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

const normalizeFont = (type) =>
  createObject({
    family: propOr(path([type, 'family'], FONTS), 'family'),
    weight: propOr(path([type, 'weight'], FONTS), 'weight'),
    name: propOr(path([type, 'name'], FONTS), 'name'),
    src: propOr([], 'src')
  });

const extractFonts = createObject({
  regular: compose(
    normalizeFont('regular'),
    propOr(FONTS.regular, 'regular'),
    propOr({}, 'fonts'),
    theme
  ),
  bold: compose(normalizeFont('bold'), propOr(FONTS.bold, 'bold'), propOr({}, 'fonts'), theme),
  ci: compose(normalizeFont('ci'), propOr(FONTS.ci, 'ci'), propOr({}, 'fonts'), theme)
}) as (input: initPayload) => { [key: string]: PodloveThemeFont };

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
}) as (input: initPayload) => PodloveThemeTokens;

export interface State {
  tokens: PodloveThemeTokens;
  fonts: { [key: string]: PodloveThemeFont };
}

export const INITIAL_STATE: State = {
  tokens: TOKENS,
  fonts: FONTS
};

export const reducer = handleActions<State, initPayload>(
  {
    [init.toString()]: (_, { payload }: Action<initPayload>): State => ({
      tokens: extractTokens(payload),
      fonts: extractFonts(payload)
    })
  },
  INITIAL_STATE
);

const themeColors = propOr({}, 'tokens') as (input: State) => PodloveThemeTokens;
const themeFonts = propOr({}, 'fonts') as (input: State) => { [key: string]: PodloveThemeFont };

export const selectors = {
  brand: createSelector(themeColors, prop('brand')),
  brandDark: createSelector(themeColors, prop('brandDark')),
  brandDarkest: createSelector(themeColors, prop('brandDarkest')),
  brandLightest: createSelector(themeColors, prop('brandLightest')),
  shadeDark: createSelector(themeColors, prop('shadeDark')),
  shadeBase: createSelector(themeColors, prop('shadeBase')),
  contrast: createSelector(themeColors, prop('contrast')),
  alt: createSelector(themeColors, prop('alt')),
  fontRegular: createSelector(themeFonts, prop('regular') as (input: { [key: string]: PodloveThemeFont }) => PodloveThemeFont),
  fontBold: createSelector(themeFonts, prop('bold') as (input: { [key: string]: PodloveThemeFont }) => PodloveThemeFont),
  fontCi: createSelector(themeFonts, prop('ci') as (input: { [key: string]: PodloveThemeFont }) => PodloveThemeFont)
};
