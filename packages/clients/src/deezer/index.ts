import { type, platform, client } from '../types.js'
import icon from './icon.svg'

export default [
  client({
    title: 'Deezer',
    scheme: (id) => `https://www.deezer.com/de/show/${id}`,
    install: 'https://www.deezer.com/',
    platform: platform.web,
    type: type.service,
    icon
  })
]
