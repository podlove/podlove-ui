import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Downcast',
    scheme: feed => `downcast://${feed}`,
    install: 'https://apps.apple.com/app/downcast/id393858566',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'Downcast',
    scheme: feed => `downcast://${feed}`,
    install: 'https://apps.apple.com/app/downcast/id668429425',
    platform: platform.osx,
    type: type.app,
    icon
  })
]
