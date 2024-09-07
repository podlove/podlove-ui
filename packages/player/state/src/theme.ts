import { get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';
import { PodloveTheme, PodloveThemeTokens, PodloveWebPlayerEpisode } from '@podlove/types';
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

const extractTokens = (input: PodloveWebPlayerEpisode): PodloveThemeTokens => {
  const tokens = get(input, 'tokens', {});

  return Object.entries(TOKENS).reduce(
    (result, [key, fallback]) => ({ ...result, [key]: get(tokens, key, fallback) }),
    {}
  );
};

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

const themeColor =
  (key: keyof typeof TOKENS) =>
  (state: State): string =>
    get(state, ['tokens', key], get(TOKENS, key));

export const selectors = {
  brand: themeColor('brand'),
  brandDark: themeColor('brandDark'),
  brandDarkest: themeColor('brandDarkest'),
  brandLightest: themeColor('brandLightest'),
  shadeDark: themeColor('shadeDark'),
  shadeBase: themeColor('shadeBase'),
  contrast: themeColor('contrast'),
  alt: themeColor('alt')
};
