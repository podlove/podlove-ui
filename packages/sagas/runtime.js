import { put } from 'redux-saga/effects'
import { setRuntime } from '@podlove/player-actions/runtime'
import { head } from 'lodash'
import browser from 'detect-browser'
import MobileDetect from 'mobile-detect'

const platform = new MobileDetect(window.navigator.userAgent)

const locale = navigator.language || navigator.userLanguage || 'en-us'

export default function* () {
  yield put(setRuntime({
    browser: `${browser.name}:${browser.version}`,
    platform: (platform.tablet() || platform.mobile()) ? 'mobile' : 'desktop',
    language: head(locale.split('-')),
    locale
  }))
}
