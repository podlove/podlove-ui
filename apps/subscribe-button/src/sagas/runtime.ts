import { put } from 'redux-saga/effects';
import { setRuntime } from '@podlove/button-actions/runtime';
import { isMobile } from '@podlove/utils/detect';
import { head } from 'ramda';
import { detect } from 'detect-browser';

export default function* runtimeSaga() {
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
