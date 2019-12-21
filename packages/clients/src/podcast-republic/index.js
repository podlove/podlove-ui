import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Podcast Republic',
    scheme: feed => `podcastrepublic://subscribe/${feed}`,
    install: 'https://play.google.com/store/apps/details?id=com.itunestoppodcastplayer.app',
    platform: platform.android,
    type: type.app,
    icon
  })
]
