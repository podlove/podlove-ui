import { selectors as content } from '@podlove/state/content'
import { compose, prop } from 'ramda'

import show from './show'
import episode from './episode'

import root from './root'

const contentSlice = prop('content')
const type = compose(content.content, contentSlice, root.share)

const hasLink = state => (type(state) === 'show' && show.link(state)) || (type(state) !== 'show' && episode.link(state))
// const hasEmbedLink =
// return this.content !== 'show' && ((this.reference.config && this.reference.share) || this.reference.origin)

export default {
  content: type,
  hasLink
}
