import { get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';

import { PodloveWebPlayerFile } from '@podlove/types';
import { files } from '@podlove/player-config';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';
import { selectFile, selectFilePayload } from '@podlove/player-actions/files';

interface PlayerFile extends PodloveWebPlayerFile {
  hover: boolean;
}

export type State = PlayerFile[];

export const INITIAL_STATE: State = [];

export const reducer = handleActions<State, readyPayload | selectFilePayload>(
  {
    [ready.toString()]: (_state, { payload }: Action<readyPayload>): State =>
      files(payload).map((file: PodloveWebPlayerFile) => ({ ...file, hover: false })),
    [selectFile.toString()]: (state, { payload }: Action<selectFilePayload>) =>
      state.map(
        (file: PodloveWebPlayerFile) =>
          ({ ...file, hover: file.url === get(payload, 'url') })
      )
  },
  INITIAL_STATE
);

export const selectors = {
  files: (state: State) => state
};
