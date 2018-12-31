import { selectors as media } from '@podlove/state/media'
import { compose } from 'ramda'

import root from './root'

export default compose(media.media, root.media)
