import { compose, map, prop, propOr } from 'ramda'
import { toPlayerTime } from '@podlove/utils/time'
import { createObject } from '@podlove/utils/helper'

export const duration = compose(toPlayerTime, propOr(0, 'duration'))

export const version = propOr(null, 'version')

export const playtime = compose(toPlayerTime, propOr(0, 'playtime'))

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

  if (version(config) === 5) {
    return {
      tokens: propOr({}, 'tokens', theme),
      fonts: propOr({}, 'fonts', theme)
    }
  }

  const brand = propOr(null, 'main', theme)

  if (brand) {
    return {
      tokens: {
        brand
      },
      fonts: {}
    }
  }

  return {
    tokens: {},
    fonts: {}
  }
}

export const reference = propOr({}, 'reference')
export const transcripts = propOr([], 'transcripts')
export const shareReference = compose(propOr(null, 'share'), reference)

export const originReference = compose(propOr(null, 'origin'), reference)

export const episodeReference = config => {
  const ref = reference(config)

  if (version(config) === 5) {
    return propOr(null, 'episode', ref)
  }

  return propOr(null, 'config', ref)
}

export const configReference = config => {
  const ref = reference(config)

  if (version(config) === 5) {
    return propOr(null, 'config', ref)
  }

  return null
}

export const validate = config => {
  if (media(config).length === 0) {
    return false
  }

  return true
}

export const runtime = propOr({}, 'runtime')

export const language = compose(prop('language'), runtime)
export const platform = compose(prop('platform'), runtime)

export const playlist = propOr([], 'playlist')

export const files = config =>
  propOr(media(config), 'files', config)
    .filter(({ url }) => !!url)
    .reduce(
      (result, item) => [...result, ...(result.some(({ url }) => url === item.url) ? [] : [item])],
      []
    )

export const activeTab = prop('activeTab')

export const subscribeButton = prop('subscribe-button')

export const share = propOr({}, 'share')

export const channels = compose(propOr([], 'channels'), share)

export const sharePlaytime = compose(propOr(false, 'sharePlaytime'), share)
