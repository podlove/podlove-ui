import { type, platform, client } from '../types'
import { removeProtocol } from '../helper'
import icon from './icon.svg'

export default [
  client({
    title: 'iTunes',
    scheme: feed => `itpc://${removeProtocol(feed)}`,
    install: 'https://www.apple.com/itunes/',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'iTunes Web',
    scheme: id => `https://podcasts.apple.com/podcast/${id}`,
    platform: platform.web,
    type: type.service,
    icon
  })
]
