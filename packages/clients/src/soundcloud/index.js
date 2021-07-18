import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Soundcloud',
    scheme: (id) => `https://soundcloud.com/${id}`,
    install: 'https://soundcloud.com/',
    platform: platform.web,
    type: type.service,
    icon
  })
]
