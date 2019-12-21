import { put } from 'redux-saga/effects'
import { setRuntime } from '@podlove/button-actions/runtime'
import { head } from 'ramda'
import { detect } from 'detect-browser'
import { isMobile } from '@podlove/utils/detect'

export default function* runtimeSaga() {
  const browser = detect()
  const locale = navigator.language || navigator.userLanguage || 'en-us'
  yield put(
    setRuntime({
      browser: `${browser.name}:${browser.version}`,
      platform: isMobile ? 'mobile' : 'desktop',
      language: head(locale.split('-')),
      locale
    })
  )
}
