import { setRuntime } from '@podlove/button-actions/runtime';
import { isMobile } from '@podlove/utils/detect';
import { head } from 'lodash-es';
import { detect } from 'detect-browser';
import { Action } from 'redux';
import { put } from 'redux-saga/effects';

export default function* runtimeSaga(): Generator<Action> {
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
