import { put } from 'redux-saga/effects';
import { setVersion } from '@podlove/player-actions/runtime';

export const versionSaga = ({ version }: { version: string }) =>
  function* saga() {
    yield put(setVersion(version));
  };
