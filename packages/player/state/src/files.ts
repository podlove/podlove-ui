import { Action, handleActions } from 'redux-actions';
import { prop, identity } from 'ramda';

import { PodloveWebPlayerFile } from '@podlove/types';
import { READY, FILE_HOVER } from '@podlove/player-actions/types';
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
          ({ ...file, hover: file.url === prop('url', payload) })
      )
  },
  INITIAL_STATE
);

export const selectors = {
  files: identity as (input: State) => State
};
