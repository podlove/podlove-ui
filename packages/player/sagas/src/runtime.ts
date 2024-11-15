import { put } from 'redux-saga/effects';
import { setRuntime } from '@podlove/player-actions/runtime';
import { head } from 'lodash-es';
import { detect } from 'detect-browser';
import { isMobile } from '@podlove/utils/detect';

export function* runtimeSaga() {
  const browser = detect();
  const locale = navigator.language || 'en-us';
  yield put(
    setRuntime({
      browser: `${browser.name}:${browser.version}`,
      platform: isMobile ? 'mobile' : 'desktop',
      language: head(locale.split('-')),
      locale
    })
  );
}
