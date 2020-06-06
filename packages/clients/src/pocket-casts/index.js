import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'PocketCasts',
    scheme: feed => `pktc://subscribe/${encodeURIComponent(feed)}`,
    install: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts',
    platform: platform.android,
    type: type.app,
    icon
  }),
  client({
    title: 'PocketCasts',
    scheme: feed => `pktc://subscribe/${feed}`,
    install: 'https://itunes.apple.com/de/app/pocket-casts/id414834813',
    platform: platform.ios,
    type: type.app,
    icon
  }),
  client({
    title: 'PocketCasts',
    scheme: id => `https://pca.st/${id}`,
    install: 'https://play.pocketcasts.com/',
    platform: platform.web,
    type: type.service,
    icon
  })
]
