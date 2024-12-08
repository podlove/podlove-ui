import type { EventChannel } from 'redux-saga';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { channel } from '@podlove/player-sagas/helper';
import { lighten, negate } from 'farbraum';

import actions from '../store/actions';
import { isClient, isServer } from '../../lib/runtime';
import type { ColorTokens, rgbColor } from '../../types/color.types';
import { proxy } from '../../lib/url';
import { getImageColors } from '../../lib/color';

export default function ({
  selectSubscribeOverlayVisible,
  selectSearchOverlayVisible,
  selectShowPoster
}: {
  selectSubscribeOverlayVisible: (input: any) => boolean;
  selectSearchOverlayVisible: (input: any) => boolean;
  selectShowPoster: (input: any) => string | null;
}) {
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

  function* initializeColors() {
    const poster: string | null = yield select(selectShowPoster);

    const tailwindColorTokens = (color: rgbColor | null): ColorTokens | null => {
      const tokens = [100, 200, 300, 400, 500, 600, 700, 800];

      if (!color) {
        return null;
      }

      return tokens.reduce(
        (result, token) => ({
          ...result,
          [token]: lighten(color, (900 - token) / 1000) as rgbColor
        }),
        { 900: color }
      ) as ColorTokens;
    };

    if (!poster) {
      return;
    }

    const { primaryColor, complementaryColor } = yield getImageColors(poster);
    const primary = tailwindColorTokens(primaryColor);
    const complementary = tailwindColorTokens(complementaryColor);

    yield put(
      actions.colors.setColors({
        ...(primary ? { primary } : {}),
        ...(complementary ? { complementary } : {})
      })
    );
  }

  return function* () {
    if (isServer()) {
      yield takeEvery(actions.lifecycle.dataFetched.toString(), initializeColors);
    }

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
