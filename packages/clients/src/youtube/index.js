import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Youtube',
    scheme: (id) => `https://www.youtube.com/channel/${id}`,
    install: 'https://www.youtube.com/',
    platform: platform.web,
    type: type.service,
    icon
  })
]
