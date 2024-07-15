import { type, platform, client } from '../types.js'
import icon from './icon.svg'

export default [
  client({
    title: 'Podcast Addict',
    scheme: (feed) => `podcastaddict://${feed}`,
    install: 'https://play.google.com/store/apps/details?id=com.bambuna.podcastaddict',
    platform: platform.android,
    type: type.app,
    icon
  })
]
