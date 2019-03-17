import { init } from '@podlove/player-actions/lifecycle'
import { findNode } from '@podlove/utils/dom'

import { version } from '../package'
import { parseConfig } from './lib/config'
import { createSandbox } from './lib/sandbox'
import { setVisibleComponents } from './lib/visible-components'
import { applyUrlParameters } from './lib/url-params'
import { persistPlayer } from './lib/persist'

const canvas = selector => {
  const node = findNode(selector)
  const content = node.innerHTML

  return {
    node,

    init () {
      node.innerHTML = ''
    },

    reset () {
      node.innerHTML = content
    }
  }
}

window.podlovePlayer = async (selector, episode, additional = {}) => {
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
