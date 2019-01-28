import { compose } from 'ramda'
import { selectors as media } from '@podlove/state/media'

import root from './root'

export default compose(media.media, root.media)
