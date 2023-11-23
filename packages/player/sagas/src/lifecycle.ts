import type { Action } from 'redux-actions';
import { propOr } from 'ramda';
import { put, takeEvery } from 'redux-saga/effects';
import * as lifecycle from '@podlove/player-actions/lifecycle';
import { json } from '@podlove/utils/request';
import type { PodloveWebPlayerResolvedConfig } from '@podlove/types';
import { takeOnce } from './helper';

export function* lifeCycleSaga() {
  yield takeEvery(lifecycle.init.toString(), ready);
  yield takeOnce(lifecycle.init.toString(), constructed);
}

export function* ready({ payload }: Action<lifecycle.readyPayload>) {
  const [chapters, transcripts] = yield Promise.all([
    json(propOr([], 'chapters', payload)),
    json(propOr([], 'transcripts', payload))
  ]);

  // TODO: validate config
  yield put(
    lifecycle.ready({
      ...payload,
      chapters,
      transcripts
    } as PodloveWebPlayerResolvedConfig)
  );
}

export function* constructed({ payload }: Action<lifecycle.constructedPayload>) {
  yield put(lifecycle.constructed(payload));
}
