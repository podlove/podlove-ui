import { createSelector } from 'reselect'
import { selectors as chapters } from '@podlove/player-state/chapters'
import root from './root.js'
import State from '../state.js'
import { PodloveWebPlayerChapter } from '@podlove/types'

export default {
  list: createSelector(root.chapters, chapters.list) as (input: State) => PodloveWebPlayerChapter[],
  next: createSelector(root.chapters, chapters.next) as (input: State) => PodloveWebPlayerChapter | null,
  previous: createSelector(root.chapters, chapters.previous) as (input: State) => PodloveWebPlayerChapter | null,
  current: createSelector(root.chapters, chapters.current) as (input: State) => PodloveWebPlayerChapter | null,
  title: createSelector(root.chapters, chapters.title) as (input: State) => string,
  image: createSelector(root.chapters, chapters.image) as (input: State) => string
}
