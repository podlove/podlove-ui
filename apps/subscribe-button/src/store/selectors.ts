import { createSelector } from 'reselect';
import { propOr } from 'ramda';
import { selectors as configSelectors, type State as ConfigState } from '@podlove/button-state/config';
import { selectors as viewSelectors, type State as ViewState } from '@podlove/button-state/view';
import { selectors as themeSelectors, type State as ThemeState } from '@podlove/button-state/theme';
import { selectors as finishSelectors, type State as FinishState } from '@podlove/button-state/finish';
import { selectors as runtimeSelectors, type State as RuntimeState } from '@podlove/button-state/runtime';
import { selectors as clientSelectors, type State as ClientsState } from '@podlove/button-state/clients';
import type { PodloveThemeFont } from '@podlove/types';
import { scope } from '@podlove/utils/helper';

import State from './state';

const slices = {
  config: propOr({}, 'config') as (input: State) => ConfigState,
  theme: propOr({}, 'theme') as (input: State) => ThemeState,
  view: propOr({}, 'view') as (input: State) => ViewState,
  finish: propOr({}, 'finish') as (input: State) => FinishState,
  feed: propOr({}, 'feed') as (input: State) => string,
  runtime: propOr({}, 'runtime') as (input: State) => RuntimeState,
  clients: propOr([], 'clients') as (input: State) => ClientsState,
};

export const selectColor = createSelector(slices.config, configSelectors.color);
export const selectCover = createSelector(slices.config, configSelectors.cover);
export const selectFormat = createSelector(slices.config, configSelectors.format);
export const selectSize = createSelector(slices.config, configSelectors.size);
export const selectStyle = createSelector(slices.config, configSelectors.style);

export const headless = createSelector(slices.config, configSelectors.headless);

const fontString = ({ weight = 300, family = [] } : PodloveThemeFont = {}) => ({
  'font-family': family.map((font) => `"${font}"`).join(', '),
  'font-weight': weight
});

export const theme = {
  ...scope(themeSelectors, slices.theme),
  fonts: createSelector(slices.theme, (state) => [
    themeSelectors.fontRegular(state),
    themeSelectors.fontBold(state),
    themeSelectors.fontCi(state)
  ]),
  fontRegular: createSelector(slices.theme, createSelector(themeSelectors.fontRegular, fontString)),
  fontBold: createSelector(slices.theme, createSelector(themeSelectors.fontBold, fontString)),
  fontCi: createSelector(slices.theme, createSelector(themeSelectors.fontCi, fontString)),
};

export const view = scope(viewSelectors, slices.view);

export const finish = scope(finishSelectors, slices.finish);

export const runtime = scope(runtimeSelectors, slices.runtime);

export const feed = slices.feed;

export const clients = createSelector(slices.clients, clientSelectors.clients);
