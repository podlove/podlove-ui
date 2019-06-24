import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Podscout',
    scheme: feed => `podscout://${feed}`,
    install:
      'http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17',
    platform: platform.windows,
    type: type.app,
    icon
  })
]
