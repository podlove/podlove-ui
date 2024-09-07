import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import { type State as ConfigState } from '@podlove/button-state/config';
import { selectors as viewSelectors, type State as ViewState } from '@podlove/button-state/view';
import { selectors as themeSelectors, type State as ThemeState } from '@podlove/button-state/theme';
import { selectors as finishSelectors, type State as FinishState } from '@podlove/button-state/finish';
import { selectors as runtimeSelectors, type State as RuntimeState } from '@podlove/button-state/runtime';
import { selectors as clientSelectors, type State as ClientsState } from '@podlove/button-state/clients';
import { scope } from '@podlove/utils/helper';

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
  ...scope(themeSelectors, slices.theme),
};

export const view = scope(viewSelectors, slices.view);

export const finish = scope(finishSelectors, slices.finish);

export const runtime = scope(runtimeSelectors, slices.runtime);

export const feed = slices.feed;

export const clients = createSelector(slices.clients, clientSelectors.clients);
