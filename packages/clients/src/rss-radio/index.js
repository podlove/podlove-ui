import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'RSSRadio',
    scheme: feed => `rssradio://${feed}`,
    install: 'https://apps.apple.com/app/rssradio-premium-podcast-downloader/id679025359',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
