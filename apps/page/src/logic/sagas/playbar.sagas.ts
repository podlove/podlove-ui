import { put, takeEvery, select, fork, delay, call } from 'redux-saga/effects';
import {
  backendEnd,
  backendLoadingEnd,
  backendLoadingStart,
  backendPause,
  backendPlay,
  type backendLoadingEndPayload
} from '@podlove/player-actions/play';
import { setRate, mute, unmute } from '@podlove/player-actions/audio';
import scrollIntoView from 'scroll-into-view-if-needed';
import type { Action } from 'redux-actions';

import { actions, selectors } from '../store';
import { isClient } from '../../lib/runtime';

export default ({
  selectRate,
  selectMuted
}: {
  selectRate: (input: any) => number;
  selectMuted: (input: any) => boolean;
}) => {
  function* play() {
    yield put(actions.playbar.play());
  }

  function* pause() {
    yield put(actions.playbar.pause());
  }

  function* loading() {
    yield put(actions.playbar.loading());
  }

  function* restart() {
    yield put(actions.playbar.restart());
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

  function* followContent(): any {
    const episodeId: string | null = yield select(selectors.current.episode);
    const routerEpisodeId: string | null = yield select(selectors.router.episodeId);
    const followContentEnabled: boolean = yield select(selectors.playbar.followContent);
    const ghostActive: boolean = yield select(selectors.player.ghost.active);

    if (episodeId &&  routerEpisodeId && followContentEnabled) {
      const node = ghostActive ? document.getElementById('transcript-ghost-active') : document.getElementById('transcript-active');


      node &&
      scrollIntoView(node, {
        behavior: 'smooth',
        scrollMode: 'always',
        block: 'center',
        inline: 'center'
      })
    }
    yield delay(500);
    yield call(followContent);
  }

  return function* () {
    yield takeEvery(backendPlay.toString(), play);
    yield takeEvery(backendPause.toString(), pause);
    yield takeEvery(backendLoadingStart.toString(), loading);
    yield takeEvery(backendLoadingEnd.toString(), loaded);
    yield takeEvery(backendEnd.toString(), restart);
    yield takeEvery(actions.playbar.nextRate.toString(), nextRate);
    yield takeEvery(actions.playbar.toggleMute.toString(), toggleMute);

    if (isClient()) {
      yield fork(followContent);
    }
  };
};
