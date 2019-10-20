/* eslint-disable no-console */
import { prop } from 'ramda'
import { init as playerInit } from '@podlove/player-actions/lifecycle'
import { init as buttonInit } from '@podlove/button-actions/lifecycle'

import { version } from '../package'

import * as context from './lib/context'
import canvas from './lib/canvas'
import { parseConfig } from './lib/config'
import * as player from './player'
import * as subscribeButton from './subscribe-button'

const podlovePlayer = async (selector, episode, meta) => {
  let target

  try {
    const config = await parseConfig(episode, meta)
    context.create(config)
    target = await canvas(selector)

    target.init()
    const playerStore = await player.create(config, target)
    const buttonStore = await subscribeButton.create(config, target)

    playerStore.dispatch(playerInit(config))
    buttonStore.dispatch(buttonInit(subscribeButton.config(config)))

    // inter store connection
    playerStore.subscribe(() => {
      const action = prop('lastAction', playerStore.getState())
      action && buttonStore.dispatch(action)
    })

    player.restore(config, playerStore)

    return playerStore
  } catch (err) {
    target && target.reset()

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
