import { put, takeEvery, select } from 'redux-saga/effects';
import {
  backendEnd,
  backendLoadingEnd,
  backendLoadingStart,
  backendPause,
  backendPlay,
  type backendLoadingEndPayload
} from '@podlove/player-actions/play';
import { setRate, mute, unmute } from '@podlove/player-actions/audio';

import actions from '../store/actions';
import type { Action } from 'redux-actions';

export default ({
  selectRate,
  selectMuted
}: {
  selectRate: (input: any) => number;
  selectMuted: (input: any) => boolean;
}) => {
  function* play() {
    yield put(actions.play());
  }

  function* pause() {
    yield put(actions.pause());
  }

  function* loading() {
    yield put(actions.loading());
  }

  function* restart() {
    yield put(actions.restart());
  }

  function* loaded({ payload }: Action<backendLoadingEndPayload>) {
    if (payload.paused) {
      yield pause();
    } else {
      yield play();
    }
  }

  function* nextRate() {
    const steps = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0];
    const rate: number = yield select(selectRate);

    const next = steps.indexOf(rate) + 1;

    if (next < steps.length) {
      yield put(setRate(steps[next]));
    } else {
      yield put(setRate(steps[0]));
    }
  }

  function* toggleMute() {
    const muted: boolean = yield select(selectMuted);
    yield put(muted ? unmute() : mute());
  }

  return function* () {
    yield takeEvery(backendPlay.toString(), play);
    yield takeEvery(backendPause.toString(), pause);
    yield takeEvery(backendLoadingStart.toString(), loading);
    yield takeEvery(backendLoadingEnd.toString(), loaded);
    yield takeEvery(backendEnd.toString(), restart);
    yield takeEvery(actions.nextRate.toString(), nextRate);
    yield takeEvery(actions.toggleMute.toString(), toggleMute);
  };
};
