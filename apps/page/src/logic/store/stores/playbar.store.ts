import { get } from 'lodash-es';
import { ready, type readyPayload } from '@podlove/player-actions/lifecycle'
import { handleActions, createAction, type Action } from 'redux-actions'
import * as player from './player.store'

export const actions = {
  play: createAction('PLAYBAR_PLAY'),
  pause: createAction('PLAYBAR_PAUSE'),
  loading: createAction('PLAYBAR_LOADING'),
  restart: createAction('PLAYBAR_RESTART'),
  toggleMute: createAction('TOGGLE_MUTE'),
  nextRate: createAction('NEXT_RATE'),
  toggleFollowContent: createAction('FOLLOW_CONTENT'),
  toggleChaptersOverlay: createAction('TOGGLE_CHAPTERS')
}

export interface State {
  active: boolean;
  button: 'play' | 'pause' | 'loading' | 'restart';
  followContent: boolean;
  chapters: boolean;
}

export const reducer = handleActions<State, any>(
  {
    [actions.play.toString()]: (state) => ({
      ...state,
      button: 'pause'
    }),
    [actions.pause.toString()]: (state) => ({
      ...state,
      button: 'play'
    }),
    [actions.loading.toString()]: (state) => ({
      ...state,
      button: 'loading'
    }),
    [actions.restart.toString()]: (state) => ({
      ...state,
      button: 'restart'
    }),
    [actions.toggleFollowContent.toString()]: (state) => ({
      ...state,
      followContent: !state.followContent
    }),
    [actions.toggleChaptersOverlay.toString()]: (state) => ({
      ...state,
      chapters: !state.chapters
    }),
    [player.actions.selectEpisode.toString()]: (state) => ({
      ...state,
      active: true
    })
  },
  {
    active: false,
    button: 'play',
    followContent: false,
    chapters: false
  }
);

export const selectors = {
  active: (state: State) => state.active,
  button: (state: State) => state.button,
  followContent: (state: State) => state.followContent,
  chapters: (state: State) => state.chapters
}
