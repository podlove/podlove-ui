import { selectors as content } from '@podlove/state/content'
import { compose } from 'ramda'

import root from './root'

export default {
  content: compose(content.content, root.share)
}
