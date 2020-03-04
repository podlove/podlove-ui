import { selectors as content } from '@podlove/player-state/content'
import { selectors as embed } from '@podlove/player-state/embed'
import { toHumanTime } from '@podlove/utils/time'
import { addQueryParameter } from '@podlove/utils/url'
import { compose, prop } from 'ramda'

import root from './root'

import show from './show'
import episode from './episode'
import chapter from './chapters'
import reference from './reference'
import timepiece from './timepiece'

const contentSlice = prop('content')
const embedSlice = prop('embed')
const type = compose(content.content, contentSlice, root.share)
const embedSize = compose(embed.size, embedSlice, root.share)
const availableEmbedSizes = compose(embed.available, embedSlice, root.share)

const hasLink = state =>
  (type(state) === 'show' && show.link(state)) || (type(state) !== 'show' && episode.link(state))

const hasEmbedLink = state =>
  !!(
    type(state) !== 'show' &&
    reference.episode(state) &&
    (reference.share(state) || reference.origin(state))
  )

const link = state => {
  switch (type(state)) {
    case 'episode':
      return episode.link(state)
    case 'time':
      return addQueryParameter(episode.link(state), { t: toHumanTime(timepiece.playtime(state)) })
    default:
      return null
  }
}

const code = state => {
  const showTitle = show.title(state)
  const episodeTitle = episode.title(state)
  const currentChapter = chapter.current(state)

  const title = `Podlove Web Player:${showTitle ? ' ' + showTitle : ''}${
    episodeTitle ? ' - ' + episodeTitle : ''
  }`

  const parameters = {
    episode: reference.episode(state),
    ...(reference.config(state) ? { config: reference.config(state) } : {}),
    ...(type(state) === 'chapter'
      ? { t: `${toHumanTime(currentChapter.start)},${toHumanTime(currentChapter.end)}` }
      : {}),
    ...(type(state) === 'time' ? { t: toHumanTime(timepiece.playtime(state)) } : {})
  }

  return `<iframe title="${title}" height="200" src="${addQueryParameter(
    reference.share(state) || reference.origin(state) || '' + '/share.html',
    parameters
  )}" frameborder="0" scrolling="no" tabindex="0"></iframe>`
}

export default {
  content: type,
  hasLink,
  hasEmbedLink,
  embedSize,
  availableEmbedSizes,
  link,
  code
}
