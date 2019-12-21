import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Podcat',
    scheme: feed => `podcat://${feed}`,
    install: 'https://itunes.apple.com/de/app/podcasts/id845960230',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
