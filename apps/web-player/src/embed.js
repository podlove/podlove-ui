import { init } from '@podlove/player-actions/lifecycle'
import { setPlaybackParams } from '@podlove/player-actions/runtime'
import { findNode } from '@podlove/utils/dom'
import { urlParameters } from '@podlove/utils/location'
import { propOr } from 'ramda'


import { version } from '../package'

import { parseConfig } from './config'
import { createSandbox } from './sandbox'

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

    store.dispatch(setPlaybackParams(urlParameters))

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

/**
 * window.podlovePlayer = (selector, episode, additional = {}) => {
  const node = findNode(selector)
  const nodeHtml = node.innerHTML
  node.innerHTML = ''

  return requestConfig(episode)
    .then(config =>
      Promise.resolve(merge(config, additional))
        .then(setPublicPath)
        .then(createPlayerDom)
        .then(sandboxFromSelector(node))
        // Set Title for accessibility
        .then(setAccessibilityAttributes(config))
        .then(resizer)
        .then(sandboxWindow(['PODLOVE_STORE']))
        .then(dispatchUrlParameters)
    )
    .catch(err => {
      node.innerHTML = nodeHtml
      console.group(`Can't load Podlove Webplayer ${version}`)
      console.error('selector', selector)
      console.error('config', episode)
      console.error(err)
      console.groupEnd()
    })
}

 */
