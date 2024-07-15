import { type, platform, client } from '../types.js'
import icon from './icon.svg'

export default [
  client({
    title: 'Clementine',
    scheme: (feed) => `itpc://${feed}`,
    install: 'https://www.clementine-player.org/downloads',
    platform: platform.unix,
    type: type.app,
    icon
  })
]
