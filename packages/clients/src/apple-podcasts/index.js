import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Apple Podcasts',
    scheme: feed => `podcast://${feed}`,
    install: 'https://itunes.apple.com/de/app/podcasts/id525463029',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
