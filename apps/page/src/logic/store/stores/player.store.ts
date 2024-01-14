import { handleActions, createAction, type Action } from 'redux-actions'

type selectEpisodePayload = string;

export interface playEpisodePayload {
  id: string;
  playtime?: number;
}

export type restoreEpisodePayload = playEpisodePayload;


export const actions = {
  playEpisode: createAction<playEpisodePayload>('EPISODE_PLAY'),
  pauseEpisode: createAction('EPISODE_PAUSE'),
  selectEpisode: createAction<selectEpisodePayload>('EPISODE_SELECT'),
  restoreEpisode: createAction<restoreEpisodePayload>('EPISODE_RESTORE')
}

export interface State {
  episode: string | null;
}

export const reducer = handleActions<State, any>(
  {
    [actions.selectEpisode.toString()]: (state, { payload }: Action<selectEpisodePayload>) => ({
      ...state,
      episode: payload
    })
  },
  {
    episode: null
  }
);

export const selectors = {
  episode: (state: State) => state.episode
}
