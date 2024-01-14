import { handleActions, createAction, type Action } from 'redux-actions';

import { get } from 'lodash-es';

import { actions as lifecycleActions, type dataFetchedPayload } from './runtime.store'
import type { Episode } from '../../../types/feed.types';

export interface State {
  [key: string]: Episode;
}

type addEpisodePayload = Episode
type updateEpisodePayload = {id: string} & Partial<Episode>

export const actions = {
  addEpisode: createAction<addEpisodePayload>('EPISODES_ADD'),
  updateEpisode: createAction<updateEpisodePayload>('EPISODES_UPDATE')
};

export const reducer = handleActions<State, any>({
  [lifecycleActions.dataFetched.toString()]: (state, { payload }: Action<dataFetchedPayload>) => {
    return payload.episodes.reduce((result, episode) => ({
      ...result,
      [episode.id]: episode
    }), state)
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
    })
  },
  {}
);

export const selectors = {
  item: (id: string | number) => (state: State) => get(state, id, {}) as Episode,
  list: (state: State) => state
};
