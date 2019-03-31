/* eslint-disable no-console */
import { init } from '@podlove/player-actions/lifecycle'

import { version } from '../package'

import canvas from './lib/canvas'
import { parseConfig } from './lib/config'
import { createSandbox } from './lib/sandbox'
import { setVisibleComponents } from './lib/visible-components'
import { applyUrlParameters } from './lib/url-params'
import { persistPlayer } from './lib/persist'

const podlovePlayer = async (selector, episode, additional = {}) => {
  const target = canvas(selector)

  try {
    target.init()
    const config = await parseConfig(episode, additional)
    const store = await createSandbox(config, target.node)

    store.dispatch(init(config))

    setVisibleComponents(config, store)
    persistPlayer(config, store)
    applyUrlParameters(store)

    return store
  } catch (err) {
    target.reset()

    console.group(`Can't load Podlove Webplayer ${version}`)
    console.error('selector', selector)
    console.error('config', episode)
    console.error(err)
    console.groupEnd()
  }
}

if (typeof window.podlovePlayer === 'undefined') {
  window.podlovePlayer = podlovePlayer
}
