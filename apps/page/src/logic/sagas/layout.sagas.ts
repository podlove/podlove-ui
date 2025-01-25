import type { EventChannel } from 'redux-saga';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { channel } from '@podlove/player-sagas/helper';
import { isDark, lighten } from 'farbraum';
import type { Action } from 'redux-actions';

import actions from '../store/actions';
import { isClient } from '../../lib/runtime';
import type { ColorTokens, rgbColor } from '../../types/color.types';
import getImageColors from '../../lib/get-image-color';
import type { initializeThemePayload } from '../store/stores/theme.store';
import { isArray } from 'lodash-es';
import { proxy } from '../../lib/url';

export default function ({
  selectSubscribeOverlayVisible,
  selectSearchOverlayVisible,
  selectShowPoster,
  selectThemeInitialized
}: {
  selectSubscribeOverlayVisible: (input: any) => boolean;
  selectSearchOverlayVisible: (input: any) => boolean;
  selectShowPoster: (input: any) => string | null;
  selectFeed: (input: any) => string | null;
  selectThemeInitialized: (input: any) => boolean;
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

  function* initializeTheme({ payload }: Action<initializeThemePayload>) {
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

    let primaryColor: rgbColor | null = null;

    if (isArray(payload.primaryColor)) {
      primaryColor = payload.primaryColor;
    }

    if (!primaryColor && poster) {
      primaryColor = yield getImageColors(proxy(poster));
    }

    if (!primaryColor) {
      return;
    }

    const primary = tailwindColorTokens(primaryColor);
    const complementary = tailwindColorTokens(isDark(primaryColor) ? [240, 240, 240] : [1, 1, 1]);

    yield put(
      actions.theme.setTheme({
        colors: {
          ...(primary ? { primary } : {}),
          ...(complementary ? { complementary } : {})
        }
      })
    );
  }

  return function* () {
    yield takeEvery(actions.theme.initializeTheme.toString(), initializeTheme);

    if (isClient()) {
      const pageLoadStart: EventChannel<KeyboardEvent> = yield call(channel, (cb: EventListener) =>
        document.addEventListener('astro:before-preparation', cb)
      );
      const pageLoadEnd: EventChannel<KeyboardEvent> = yield call(channel, (cb: EventListener) =>
        document.addEventListener('astro:after-preparation', cb)
      );
      yield takeEvery(pageLoadStart, startLoading);
      yield takeEvery(pageLoadEnd, stopLoading);

      const initialized: boolean = yield select(selectThemeInitialized);

      if (!initialized) {
        yield put(actions.theme.initializeTheme({ primaryColor: null }));
      }

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
