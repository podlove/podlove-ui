import { compose } from 'ramda'
import { selectors as transcripts } from '@podlove/player-state/transcripts'

import root from './root'

export default {
  timeline: compose(transcripts.timeline, root.transcripts),
  active: compose(transcripts.active, root.transcripts),
  follow: compose(transcripts.follow, root.transcripts),
  hasTranscripts: compose(transcripts.hasTranscripts, root.transcripts),
  searchQuery: compose(transcripts.searchQuery, root.transcripts),
  searchSelected: compose(transcripts.searchSelected, root.transcripts),
  searchResults: compose(transcripts.searchResults, root.transcripts),
  searching: compose(transcripts.searching, root.transcripts)
}
