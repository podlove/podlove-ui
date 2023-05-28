import { createSelector } from 'reselect';
import { selectors as episode } from '@podlove/player-state/episode';
import root from './root.js';

export default {
  title: createSelector(root.episode, episode.title),
  subtitle: createSelector(root.episode, episode.subtitle),
  summary: createSelector(root.episode, episode.summary),
  link: createSelector(root.episode, episode.link),
  poster: createSelector(root.episode, episode.poster),
  publicationDate: createSelector(root.episode, episode.publicationDate)
};
