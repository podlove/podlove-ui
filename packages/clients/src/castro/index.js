import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Castro',
    scheme: feed => `castro://subscribe/${feed}`,
    install: 'https://itunes.apple.com/app/castro-2/id1080840241',
    type: type.app,
    platform: platform.ios,
    icon
  })
]
