import { Action, handleActions } from 'redux-actions';
import { propOr, prop } from 'ramda';
import { TOGGLE_TAB } from '@podlove/player-actions/types';
import { toggleTab } from '@podlove/player-actions/tabs';
import { toggleTabPayload } from '@podlove/player-actions/tabs';

export interface State {
  chapters: boolean;
  share: boolean;
  files: boolean;
  shownotes: boolean;
  playlist: boolean;
  transcripts: boolean;
}

export const INITIAL_STATE: State = {
  chapters: false,
  share: false,
  files: false,
  shownotes: false,
  playlist: false,
  transcripts: false
};

export const reducer = handleActions<State, toggleTabPayload>(
  {
    [toggleTab.toString()]: (state, { payload }: Action<toggleTabPayload>) => ({
      ...INITIAL_STATE,
      [payload]: !propOr(false, payload, state)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  chapters: prop('chapters') as (input: State) => boolean,
  audio: prop('audio') as (input: State) => boolean,
  share: prop('share') as (input: State) => boolean,
  files: prop('files') as (input: State) => boolean,
  shownotes: prop('shownotes') as (input: State) => boolean,
  transcripts: prop('transcripts') as (input: State) => boolean,
  playlist: prop('playlist') as (input: State) => boolean
};
