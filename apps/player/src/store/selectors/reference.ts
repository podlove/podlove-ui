import { createSelector } from 'reselect'
import { selectors as reference } from '@podlove/player-state/reference'

import root from './root.js'
import State from '../state.js'

export default {
  share: createSelector(root.reference, reference.share) as (input: State) => string | null,
  config: createSelector(root.reference, reference.config) as (input: State) => string | null,
  episode: createSelector(root.reference, reference.episode) as (input: State) => string | null
}
