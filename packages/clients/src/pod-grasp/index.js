import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'PodGrasp',
    scheme: feed => `podgrasp://subscribe/${feed}`,
    install: 'https://itunes.apple.com/de/app/podgrasp-podcast-player/id531648276',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'PodGrasp',
    scheme: feed => `podgrasp://subscribe/${feed}`,
    platform: platform.osx,
    type: type.app,
    icon
  })
]
