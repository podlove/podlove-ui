import { selectors as runtime } from '@podlove/player-state/runtime'
import { compose } from 'ramda'

import root from './root'

const target = compose(mode => (mode === 'native' ? '_parent' : '_blank'), runtime.mode)

const fixed = compose(mode => mode === 'embed', runtime.mode)

export default {
  language: compose(runtime.language, root.runtime),
  platform: compose(runtime.platform, root.runtime),
  mode: compose(runtime.mode, root.runtime),
  locale: compose(runtime.locale, root.runtime),
  version: compose(runtime.version, root.runtime),
  target: compose(target, root.runtime),
  fixed: compose(fixed, root.runtime)
}
