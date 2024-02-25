import type { EventChannel } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { channel } from '@podlove/player-sagas/helper';

import actions from '../store/actions';
import { isClient } from '../../lib/runtime';

function* disableOverflow() {
  document.body.classList.add('overflow-hidden');
}

function* enableOverflow() {
  document.body.classList.remove('overflow-hidden');
}

function* startLoading() {
  yield put(actions.view.startLoading());
}

function* stopLoading() {
  yield put(actions.view.stopLoading());
}

export default function ({
  selectSubscribeOverlayVisible,
  selectSearchOverlayVisible
}: {
  selectSubscribeOverlayVisible: (input: any) => boolean;
  selectSearchOverlayVisible: (input: any) => boolean;
}) {
  return function* () {
    if (isClient()) {
      const pageLoadStart: EventChannel<KeyboardEvent> = yield call(channel, (cb: EventListener) =>
        document.addEventListener('astro:before-preparation', cb)
      );
      const pageLoadEnd: EventChannel<KeyboardEvent> = yield call(channel, (cb: EventListener) =>
        document.addEventListener('astro:after-preparation', cb)
      );

      yield takeEvery(pageLoadStart, startLoading);
      yield takeEvery(pageLoadEnd, stopLoading);
    }

    while (true) {
      const subscribeOverlayVisible: boolean = yield select(selectSubscribeOverlayVisible);
      const searchOverlayVisible: boolean = yield select(selectSearchOverlayVisible);

      if (subscribeOverlayVisible || searchOverlayVisible) {
        disableOverflow();
      } else {
        enableOverflow();
      }
    }
  };
}
