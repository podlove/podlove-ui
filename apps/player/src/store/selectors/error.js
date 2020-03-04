import { compose } from 'ramda'
import { selectors as error } from '@podlove/player-state/error'
import root from './root'

export default {
  active: compose(error.active, root.error),
  icon: compose(error.icon, root.error),
  title: compose(error.title, root.error),
  message: compose(error.message, root.error),
  retry: compose(error.retry, root.error)
}
