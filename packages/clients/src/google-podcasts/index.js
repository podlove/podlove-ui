import { type, platform, client } from '../types'
import icon from './icon.svg'

export default [
  client({
    title: 'Google Podcasts',
    scheme: feed => `pcast://${feed}`,
    install: 'https://play.google.com/store/apps/details?id=com.google.android.apps.podcasts',
    platform: platform.android,
    type: type.app,
    icon
  }),
  client({
    title: 'Google Podcasts',
    scheme: feed => `https://podcasts.google.com/?feed=${btoa(feed)}`,
    platform: platform.web,
    type: type.service,
    icon
  })
]
