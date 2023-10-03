import { createSelector } from 'reselect';
import { selectors as episode } from '@podlove/player-state/episode';
import root from './root.js';
import State from '../state.js';

export default {
  title: createSelector(root.episode, episode.title) as (input: State) => string | null,
  subtitle: createSelector(root.episode, episode.subtitle) as (input: State) => string | null,
  summary: createSelector(root.episode, episode.summary)as (input: State) => string | null,
  link: createSelector(root.episode, episode.link) as (input: State) => string | null,
  poster: createSelector(root.episode, episode.poster) as (input: State) => string | null,
  publicationDate: createSelector(root.episode, episode.publicationDate) as (input: State) => number | null
};
