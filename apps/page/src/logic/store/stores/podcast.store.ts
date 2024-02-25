import { handleActions, type Action } from 'redux-actions';
import { get } from 'lodash-es';
import { actions as lifecycleActions, type dataFetchedPayload, type initializeAppPayload } from './runtime.store'
import type { Author, Show } from '../../../types/feed.types';

export interface State {
  feed: string | null;
  title: string | null;
  poster: string | null;
  description: string | null;
  summary: string | null;
  author: Author;
}

export const reducer = handleActions<State, any>({
  [lifecycleActions.dataFetched.toString()]: (state, { payload }: Action<dataFetchedPayload>) => ({
    ...state,
    title: get(payload, ['show', 'title'], null),
    poster: get(payload, ['show', 'poster'], null),
    description: get(payload, ['show', 'description'], null),
    summary: get(payload, ['show', 'summary'], null),
    author: get(payload, ['author'], {
      owner: null,
      copyright: null,
      name: null,
      mail: null,
    }),
  }),
  [lifecycleActions.initializeApp.toString()]: (state, { payload }: Action<initializeAppPayload>) => ({
    ...state,
    feed: payload.feed
  })
}, {
  feed: null,
  title: null,
  poster: null,
  description: null,
  summary: null,
  author: {
    owner: null,
    copyright: null,
    name: null,
    mail: null,
  }
});

export const selectors = {
  show: (state: State): Show => ({
    title: get(state, 'title') || '',
    description: get(state, 'description') || '',
    link: get(state, 'link') || '',
    poster: get(state, 'poster') || '',
    summary: get(state, 'summary') || '',
  }),
  feed: (state: State) => get(state, 'feed'),
  title: (state: State) => get(state, 'title'),
  poster: (state: State) => get(state, 'poster'),
  description: (state: State) => get(state, 'description'),
  summary: (state: State) => get(state, 'summary'),
  copyright: (state: State) => get(state, ['author', 'copyright']),
  owner: (state: State) => get(state, ['author', 'owner']),
  mail: (state: State) => get(state, ['author', 'mail'])
}
