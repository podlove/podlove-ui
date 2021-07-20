import { type, platform, client } from '../types'
import { removeProtocol } from '../helper'
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
