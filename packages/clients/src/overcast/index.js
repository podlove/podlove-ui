import { type, platform, client } from '../types'
import { removeHttps } from '../helper'
import icon from './icon.svg'

export default [
  client({
    title: 'Overcast',
    scheme: feed => `overcast://x-callback-url/add?url=${removeHttps(feed)}`,
    install: 'https://apps.apple.com/app/overcast-podcast-player/id888422857',
    platform: platform.ios,
    type: type.app,
    icon
  })
]
