import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Procast',
    scheme: (feed) => `procast://subscribe/${feed}`,
    install: 'https://itunes.apple.com/de/app/procast-podcast-app/id1215380730',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'Procast',
    scheme: (feed) => `procast://subscribe/${feed}`,
    install: 'https://play.google.com/store/apps/details?id=com.podflitzer.android',
    platform: platform.android,
    type: type.app,
    icon
  })
]
