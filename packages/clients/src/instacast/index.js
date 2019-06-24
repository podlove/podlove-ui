import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Instacast',
    scheme: feed => `instacast://${feed}`,
    install: 'https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'Instacast',
    scheme: feed => `instacast://${feed}`,
    platform: platform.osx,
    type: type.app,
    icon
  })
]
