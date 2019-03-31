import { put } from 'redux-saga/effects'
import { setRuntime } from '@podlove/player-actions/runtime'
import { head } from 'ramda'
import browser from 'detect-browser'
import { isMobile } from '@podlove/utils/detect'

const locale = navigator.language || navigator.userLanguage || 'en-us'

export default function*() {
  yield put(
    setRuntime({
      browser: `${browser.name}:${browser.version}`,
      platform: isMobile ? 'mobile' : 'desktop',
      language: head(locale.split('-')),
      locale
    })
  )
}
