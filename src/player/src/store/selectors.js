import { compose, get } from 'lodash/fp'
import { selectors as runtime } from '@podlove/player-state/runtime'

const runtimeSlice = get('runtime')

export default {
  language: compose(runtime.language, runtimeSlice),
  display: compose(runtime.display, runtimeSlice)
}
