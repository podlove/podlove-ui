import { selectors as runtime } from '@podlove/player-state/runtime'
import { compose } from 'ramda'

import root from './root'

const target = compose(
  display => (display === 'native' ? '_parent' : '_blank'),
  runtime.display
)

export default {
  language: compose(
    runtime.language,
    root.runtime
  ),
  platform: compose(
    runtime.platform,
    root.runtime
  ),
  display: compose(
    runtime.display,
    root.runtime
  ),
  locale: compose(
    runtime.locale,
    root.runtime
  ),
  version: compose(
    runtime.version,
    root.runtime
  ),
  target: compose(
    target,
    root.runtime
  )
}
