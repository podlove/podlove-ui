import { handleActions, type Action } from 'redux-actions';

import { flattenDeep, get } from 'lodash-es';

import { actions as lifecycleActions, type dataFetchedPayload } from './runtime.store'
import type { Episode, Person } from '../../../types/feed.types';

export interface State {
  [key: string]: Person;
}

export type episodeLoadPayload = Episode[];
export type requestEpisodePayload = string | string[];


export const reducer = handleActions<State, any>({
  [lifecycleActions.dataFetched.toString()]: (state, { payload }: Action<dataFetchedPayload>) => {
      return flattenDeep(payload.episodes.map(episode => episode.contributors || [])).reduce((result, contributor) => ({
        ...result,
        [contributor.id]: contributor
      }), state)
    },

  },
  {}
);

export const selectors = {
  item: (id: string | number) => (state: State) => get(state, id, {}) as Person,
  list: (state: State) => Object.values(state)
};
