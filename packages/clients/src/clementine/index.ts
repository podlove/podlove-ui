import { type, platform, client } from '../types'
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
