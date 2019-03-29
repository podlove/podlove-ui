import { urlParameters } from '@podlove/utils/location'

import { init } from '@podlove/player-actions/lifecycle'
import { setMode } from '@podlove/player-actions/runtime'

import { version } from '../package'

import { parseConfig } from './lib/config'
import { setVisibleComponents } from './lib/visible-components'
import { applyUrlParameters } from './lib/url-params'
import { persistPlayer } from './lib/persist'

const bootstrap = async episode => {
  try {
    const config = await parseConfig(episode)
    const store = window.PODLOVE_STORE

    store.dispatch(init(config))
    store.dispatch(setMode('embed'))

    setVisibleComponents(config, store)
    persistPlayer(config, store)
    applyUrlParameters(store)

    return store
  } catch (err) {
    console.group(`Can't load Podlove Webplayer ${version}`)
    console.error('config', episode)
    console.error(err)
    console.groupEnd()
  }
}

bootstrap(urlParameters.episode)
