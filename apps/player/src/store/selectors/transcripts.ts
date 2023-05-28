import { createSelector } from 'reselect';
import { selectors as transcripts } from '@podlove/player-state/transcripts';

import root from './root.js';

export default {
  timeline: createSelector(root.transcripts , transcripts.timeline),
  active: createSelector(root.transcripts , transcripts.active),
  follow: createSelector(root.transcripts , transcripts.follow),
  hasTranscripts: createSelector(root.transcripts , transcripts.hasTranscripts),
  searchQuery: createSelector(root.transcripts , transcripts.searchQuery),
  searchSelected: createSelector(root.transcripts , transcripts.searchSelected),
  searchResults: createSelector(root.transcripts , transcripts.searchResults),
  searching: createSelector(root.transcripts , transcripts.searching)
};
