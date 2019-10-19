import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'PRSSRadio',
    scheme: feed => `rssradio://${feed}`,
    install: 'https://itunes.apple.com/app/rssradio-premium-podcast-downloader/id679025359',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
