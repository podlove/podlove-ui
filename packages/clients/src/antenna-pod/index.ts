import { type, platform, client } from '../types.js'
import { removeProtocol } from '../helper.js'
import icon from './icon.svg'

export default [
  client({
    title: 'AntennaPod',
    scheme: (feed) => `itpc://${removeProtocol(feed)}`,
    install: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod',
    platform: platform.android,
    type: type.app,
    icon
  })
]
