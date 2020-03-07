import { type, platform, client } from '../types'
import { removeProtocol } from '../helper'
import icon from './icon.svg'

export default [
  client({
    title: 'Apple Podcasts',
    scheme: feed => `podcast://${removeProtocol(feed)}`,
    install: 'https://itunes.apple.com/app/podcasts/id525463029',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'Apple Podcasts',
    scheme: feed => `podcast://${removeProtocol(feed)}`,
    platform: platform.osx,
    type: type.app,
    icon
  }),
  client({
    title: 'Apple Podcasts',
    scheme: (id = '') =>
      `https://podcasts.apple.com/podcast/${id.startsWith('id') ? id : 'id' + id}`,
    platform: platform.web,
    type: type.service,
    icon
  })
]
