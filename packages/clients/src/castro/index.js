import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Castro',
    scheme: (itunesId = '') => `https://castro.fm/itunes/${itunesId.replace('id', '')}`,
    install: 'https://itunes.apple.com/app/castro-2/id1080840241',
    type: type.service,
    platform: platform.ios,
    icon
  })
]
