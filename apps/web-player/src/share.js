/* eslint-disable no-console */
import { urlParameters } from '@podlove/utils/location'
import { init } from '@podlove/player-actions/lifecycle'

import { version } from '../package'

import { parseConfig } from './lib/config'
import * as player from './player'

const bootstrap = async ({ episode, config }) => {
  try {
    const playerConfig = await parseConfig(episode, config)
    const store = window.PODLOVE_STORE

    store.dispatch(init(playerConfig))
    player.restore(config, store)

    return store
  } catch (err) {
    console.group(`Can't load Podlove Webplayer ${version}`)
    console.error('config', episode)
    console.error(err)
    console.groupEnd()
  }
}

bootstrap(urlParameters())
