import { createSelector } from 'reselect'
import { selectors as error } from '@podlove/player-state/error'
import root from './root.js'

export default {
  active: createSelector(root.error, error.active),
  icon: createSelector(root.error, error.icon),
  title: createSelector(root.error, error.title),
  message: createSelector(root.error, error.message),
  retry: createSelector(root.error, error.retry)
}
