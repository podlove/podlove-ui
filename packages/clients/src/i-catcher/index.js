import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'iCatcher',
    scheme: feed => `icatcher://${feed}`,
    install: 'https://apps.apple.com/app/icatcher!-podcast-app/id414419105',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
