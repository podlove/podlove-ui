import { handleActions, createAction, type Action } from 'redux-actions';

import { get } from 'lodash-es';

import { actions as lifecycleActions, type dataFetchedPayload } from './runtime.store'
import type { Episode } from '../../../types/feed.types';

export interface State {
  [key: string]: Episode;
}

type addEpisodePayload = Episode
export type episodeLoadPayload = Episode[];
type updateEpisodePayload = {id: string} & Partial<Episode>
export type requestEpisodePayload = string | string[];

export const actions = {
  addEpisode: createAction<addEpisodePayload>('EPISODES_ADD'),
  updateEpisode: createAction<updateEpisodePayload>('EPISODES_UPDATE'),
  requestEpisode: createAction<requestEpisodePayload>('EPISODE_REQUEST'),
  episodeLoad: createAction<episodeLoadPayload>('EPISODE_LOAD')
};

export const reducer = handleActions<State, any>({
  [lifecycleActions.dataFetched.toString()]: (_state, { payload }: Action<dataFetchedPayload>) => {
    return payload.data.episodes.reduce((result, episode) => ({
      ...result,
      [episode.id]: episode
    }), {})
  },
  [actions.addEpisode.toString()]: (state: State, { payload }: Action<addEpisodePayload>) => ({
      ...state,
      [payload.id]: payload
  }),
  [actions.updateEpisode.toString()]: (state: State, { payload }: Action<updateEpisodePayload>) => ({
      ...state,
      [payload.id]: {
        ...state[payload.id],
        ...payload
      }
    }),
  [actions.episodeLoad.toString()]: (state: State, { payload }: Action<episodeLoadPayload>) => payload.reduce((result, episode) => ({
    ...result,
    [episode.id]: episode
  }), state),
  },
  {}
);

export const selectors = {
  item: (id: string | number) => (state: State) => get(state, id, {}) as Episode,
  list: (state: State) => Object.values(state)
};
