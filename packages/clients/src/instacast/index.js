import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Instacast',
    scheme: (feed) => `instacast://${feed}`,
    install: 'https://github.com/martinhering/instacast', // 'https://apps.apple.com/app/instacast-core/id1083868334',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'Instacast',
    scheme: (feed) => `instacast://${feed}`,
    platform: platform.osx,
    type: type.app,
    icon
  })
]
