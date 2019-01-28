import { compose } from 'ramda'
import root from './root'
import { selectors as progress } from '@podlove/state/progress'

export default {
  ghost: compose(progress.ghost, root.progress)
}
