import { type, platform, client } from '../types.js'
import icon from './icon.svg'

export default [
  client({
    title: 'Podcat',
    scheme: (feed) => `podcat://${feed}`,
    install: 'https://apps.apple.com/app/podcasts/id845960230',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
