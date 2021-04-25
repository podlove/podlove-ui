import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'RSSRadio',
    scheme: feed => `rssradio://${feed}`,
    install: 'https://apps.apple.com/app/rssradio-podcast-player/id386600664',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
