import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'RSS',
    scheme: feed => feed,
    platform: platform.web,
    type: type.service,
    icon
  })
]
