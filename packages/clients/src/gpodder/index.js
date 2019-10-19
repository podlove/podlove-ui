import { type, platform, client } from '../types'
import { removeHttps } from '../helper'
import icon from './icon.svg'

export default [
  client({
    title: 'gPodder',
    scheme: feed => `gpodder://${feed}`,
    install: 'http://gpodder.org/downloads',
    platform: platform.unix,
    type: type.app,
    icon
  }),
  client({
    title: 'gPodder',
    scheme: feed => `gpodder://${feed}`,
    install: 'http://gpodder.org/downloads',
    platform: platform.windows,
    type: type.app,
    icon
  }),
  client({
    title: 'gpodder.net',
    scheme: feed => `http://gpodder.net/subscribe?url=${encodeURIComponent(removeHttps(feed))}`,
    install: 'https://gpodder.net/',
    platform: platform.web,
    type: type.app,
    icon
  })
]
