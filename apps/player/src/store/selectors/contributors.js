import { compose } from 'ramda'
import { selectors as contributors } from '@podlove/state/contributors'

import root from './root'

export default compose(contributors.contributors, root.contributors)
