import { createSelector } from 'reselect'
import { selectors as show } from '@podlove/player-state/show'

import root from './root.js'
import State from '../state.js'

export default {
  title: createSelector(root.show, show.title) as (input: State) => string | null,
  subtitle: createSelector(root.show, show.subtitle) as (input: State) => string | null,
  summary: createSelector(root.show, show.summary) as (input: State) => string | null,
  link: createSelector(root.show, show.link) as (input: State) => string | null,
  poster: createSelector(root.show, show.poster) as (input: State) => string | null
}
