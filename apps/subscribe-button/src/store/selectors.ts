import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import { type State as ConfigState } from '@podlove/button-state/config';
import { selectors as viewSelectors, type State as ViewState } from '@podlove/button-state/view';
import { selectors as themeSelectors, type State as ThemeState } from '@podlove/button-state/theme';
import { selectors as finishSelectors, type State as FinishState } from '@podlove/button-state/finish';
import { selectors as runtimeSelectors, type State as RuntimeState } from '@podlove/button-state/runtime';
import { selectors as clientSelectors, type State as ClientsState } from '@podlove/button-state/clients';

import State from './state.js';

const slice = <T>(slice: string, fallback = {}) => (state: State): T => get(state, slice, fallback);

const slices = {
  config: slice<ConfigState>('config'),
  theme: slice<ThemeState>('theme'),
  view: slice<ViewState>('view'),
  finish:slice<FinishState>('finish'),
  feed: slice<string>('feed'),
  runtime: slice<RuntimeState>('runtime'),
  clients: slice<ClientsState>('clients', []),
};

export const theme = {
  brand: createSelector(slices.theme, themeSelectors.brand),
  brandDark: createSelector(slices.theme, themeSelectors.brandDark),
  brandDarkest: createSelector(slices.theme, themeSelectors.brandDarkest),
  brandLightest: createSelector(slices.theme, themeSelectors.brandLightest),
  shadeDark: createSelector(slices.theme, themeSelectors.shadeDark),
  shadeBase: createSelector(slices.theme, themeSelectors.shadeBase),
  contrast: createSelector(slices.theme, themeSelectors.contrast),
  alt: createSelector(slices.theme, themeSelectors.alt),
};

export const view = {
  overlay:  createSelector(slices.view, viewSelectors.overlay),
  finish:  createSelector(slices.view, viewSelectors.finish),
  list:  createSelector(slices.view, viewSelectors.list)
}


export const finish = {
  overlay: createSelector(slices.finish, finishSelectors.overlay),
  finish: createSelector(slices.finish, finishSelectors.finish),
  icon: createSelector(slices.finish, finishSelectors.icon),
  link: createSelector(slices.finish, finishSelectors.link),
  os: createSelector(slices.finish, finishSelectors.os),
  rss: createSelector(slices.finish, finishSelectors.rss),
  type: createSelector(slices.finish, finishSelectors.type),
  install: createSelector(slices.finish, finishSelectors.install),
}

export const runtime = {
  language: createSelector(slices.runtime, runtimeSelectors.language),
  platform: createSelector(slices.runtime, runtimeSelectors.platform),
  locale: createSelector(slices.runtime, runtimeSelectors.locale),
  version: createSelector(slices.runtime, runtimeSelectors.version),
}

export const feed = slices.feed;

export const clients = createSelector(slices.clients, clientSelectors.clients);
