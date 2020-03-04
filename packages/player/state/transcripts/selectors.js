import { compose, prop } from 'ramda'

export const timeline = prop('timeline')
export const active = prop('active')
export const follow = prop('follow')
export const hasTranscripts = prop('hasTranscripts')
export const search = prop('search')
export const searchQuery = compose(prop('query'), search)
export const searchSelected = compose(prop('selected'), search)
export const searchResults = compose(prop('results'), search)
export const searching = compose(prop('searching'), search)
