import { handleActions, type Action } from 'redux-actions';
import { actions as lifecycleActions, type dataFetchedPayload, type initializePayload } from './runtime.store'
import { get } from 'lodash-es';

export interface State {
  feed: string | null;
  title: string | null;
  image: string | null;
  description: string | null;
  summary: string | null;
  episodes: string[];
}

export const reducer = handleActions<State, any>({
  [lifecycleActions.dataFetched.toString()]: (state, { payload }: Action<dataFetchedPayload>) => ({
    ...state,
    title: get(payload, ['show', 'title'], null),
    image: get(payload, ['show', 'image'], null),
    description: get(payload, ['show', 'description'], null),
    summary: get(payload, ['show', 'summary'], null),
    episodes: get(payload, ['episodes'], []).map(({ id }) => id)
  }),
  [lifecycleActions.initializeApp.toString()]: (state, { payload }: Action<initializePayload>) => ({
    ...state,
    feed: payload.feed
  })
}, {
  feed: null,
  title: null,
  image: null,
  description: null,
  summary: null,
  episodes: []
});

export const selectors = {
  feed: (state: State) => get(state, 'feed'),
  title: (state: State) => get(state, 'title'),
  image: (state: State) => get(state, 'image'),
  description: (state: State) => get(state, 'description'),
  summary: (state: State) => get(state, 'summary'),
  episodes: (state: State) => get(state, 'episodes'),
}
