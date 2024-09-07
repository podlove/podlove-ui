import { Action, handleActions } from 'redux-actions';
import { get } from 'lodash-es';
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
      [payload]: !get(state, payload, false)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  chapters: (state: State) => state.chapters,
  share: (state: State) => state.share,
  files: (state: State) => state.files,
  shownotes: (state: State) => state.shownotes,
  transcripts: (state: State) => state.transcripts,
  playlist: (state: State) => state.playlist
};
