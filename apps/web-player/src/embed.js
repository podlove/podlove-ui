/* eslint-disable no-console, no-empty */
import { init as playerInit } from '@podlove/player-actions/lifecycle'
import { init as buttonInit } from '@podlove/button-actions/lifecycle'
import * as configParser from '@podlove/player-config'

import { version } from '../package'

import * as context from './lib/context'
import canvas from './lib/canvas'
import connect from './lib/connect'
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

    playerStore.dispatch(playerInit(config))

    if (configParser.subscribeButton(config)) {
      const buttonStore = await subscribeButton.create(config, target)

      buttonStore.dispatch(buttonInit(subscribeButton.config(config)))

      // inter store connection
      connect({ store: playerStore, prefix: 'PLAYER' }, { store: buttonStore, prefix: 'BUTTON' })
    }

    try {
      player.restore(config, playerStore)
    } catch (e) {}

    return playerStore
  } catch (err) {
    console.group(`Error in Podlove Webplayer ${version}`)
    console.warn('selector', selector)
    console.warn('config', episode)
    console.warn(err)
    console.groupEnd()
  }
}

if (typeof window.podlovePlayer === 'undefined') {
  window.podlovePlayer = podlovePlayer
}
