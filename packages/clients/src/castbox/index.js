import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Castbox',
    scheme: id => `https://castbox.fm/channel/${id}`,
    platform: platform.web,
    type: type.service,
    icon
  })
]
