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
  }),
  client({
    title: 'Apple Podcasts',
    scheme: feed => `pcast://${feed}`,
    platform: platform.osx,
    type: type.app,
    icon
  }),
  client({
    title: 'Apple Podcasts',
    scheme: id => `https://podcasts.apple.com/podcast/${id}`,
    platform: platform.web,
    type: type.service,
    icon
  })
]
