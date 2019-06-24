import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Spotify',
    scheme: id => `https://open.spotify.com/show/${id}`,
    install: 'https://www.spotify.com/',
    platform: platform.web,
    type: type.service,
    icon
  })
]
