import { type, platform, client } from '../types.js'
import icon from './icon.svg'

export default [
  client({
    title: 'BeyondPod',
    scheme: (feed) => `beyondpod://${feed}`,
    install: 'https://play.google.com/store/apps/details?id=mobi.beyondpod',
    platform: platform.android,
    type: type.app,
    icon
  })
]
