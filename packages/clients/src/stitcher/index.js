import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Stitcher',
    scheme: id => `https://www.stitcher.com/podcast/${id}`,
    install: 'https://www.stitcher.com/',
    platform: platform.web,
    type: type.service,
    icon
  })
]
