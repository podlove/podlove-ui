import { compose, map, prop, concat, propOr } from 'ramda'
import { toPlayerTime } from './time'
import { createObject } from './helper'

export const duration = compose(
  toPlayerTime,
  propOr(0, 'duration')
)

export const version = propOr(4, 'version')

export const playtime = compose(
  toPlayerTime,
  propOr(0, 'playtime')
)

export const media = compose(
  map(
    createObject({
      url: propOr(null, 'url'),
      size: propOr(0, 'size'),
      title: propOr(null, 'title'),
      mimeType: propOr(null, 'mimeType')
    })
  ),
  propOr([], 'audio')
)

export const chapters = propOr([], 'chapters')
export const theme = config => {
  const theme = propOr({}, 'theme', config)

  if (version(config) === 4) {
    return {
      tokens: {
        brand: prop('main', theme)
      },
      fonts: {}
    }
  }

  return {
    tokens: propOr({}, 'tokens', theme),
    fonts: propOr({}, 'fonts', theme)
  }
}

export const reference = propOr({}, 'reference')
export const transcripts = propOr([], 'transcripts')
export const shareReference = compose(
  propOr(null, 'share'),
  reference
)
export const originReference = compose(
  propOr(null, 'origin'),
  reference
)
export const episodeReference = config => {
  const ref = reference(config)

  if (version(config) === 4) {
    return propOr(null, 'config', ref)
  }

  return propOr(null, 'episode', ref)
}

export const configReference = config => {
  const ref = reference(config)

  if (version(config) === 4) {
    return null
  }

  return propOr(null, 'config', ref)
}

export const validate = config => {
  if (media(config).length === 0) {
    return false
  }

  return true
}

export const runtime = propOr({}, 'runtime')

export const language = compose(
  prop('language'),
  runtime
)
export const platform = compose(
  prop('platform'),
  runtime
)

export const playlist = propOr([], 'playlist')

export const files = config =>
  concat(propOr([], 'files', config), media(config)).reduce(
    (result, item) => [...result, ...(result.some(({ url }) => url === item.url) ? [] : [item])],
    []
  )

export const getActiveTab = prop('activeTab')

export const channels = propOr([], 'channels')
