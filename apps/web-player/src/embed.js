/* eslint-disable no-console, no-empty */
import { prop } from 'ramda'
import { init as playerInit } from '@podlove/player-actions/lifecycle'
import { init as buttonInit } from '@podlove/button-actions/lifecycle'
import * as configParser from '@podlove/player-config'

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

    playerStore.dispatch(playerInit(config))

    if (configParser.subscribeButton(config)) {
      const buttonStore = await subscribeButton.create(config, target)

      buttonStore.dispatch(buttonInit(subscribeButton.config(config)))

      // inter store connection
      playerStore.subscribe(() => {
        const action = prop('lastAction', playerStore.getState())

        try {
          buttonStore.dispatch(action)
        } catch (err) {}
      })
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
