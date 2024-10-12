import type { Action } from 'redux-actions';
import { get } from 'lodash-es';
import { put, takeEvery } from 'redux-saga/effects';
import * as lifecycle from '@podlove/player-actions/lifecycle';
import { json } from '@podlove/utils/request';

import { takeOnce } from './helper.js';

export function* lifeCycleSaga() {
  yield takeEvery(lifecycle.init.toString(), ready);
  yield takeOnce(lifecycle.init.toString(), constructed);
}

export function* ready({ payload }: Action<lifecycle.readyPayload>) {
  const [chapters, transcripts] = yield Promise.all([
    json(get(payload, 'chapters', [])),
    json(get(payload, 'transcripts', []))
  ]);

  // TODO: validate config
  yield put(
    lifecycle.ready({
      ...payload,
      chapters,
      transcripts
    })
  );
}

export function* constructed({ payload }: Action<lifecycle.constructedPayload>) {
  yield put(lifecycle.constructed(payload));
}
