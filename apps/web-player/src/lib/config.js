import { mergeDeepRight, propOr, uniqWith, concat, eqProps, compose } from 'ramda'

const request = async url => fetch(url).then(res => res.json())

const media = config => {
  const media = propOr([], 'media', config)
  const audio = propOr([], 'audio', config)
  const video = propOr([], 'video', config)

  return uniqWith(eqProps('url'), concat(media, audio, video, audio))
}

const files = media

const chapters = async config => {
  try {
    return typeof config.chapters === 'string' ? await request(config.chapters) : config.chapters
  } catch (err) {
    console.warn(`Couldn't parse chapters "${chapters}", falling back to empty list`)
    return []
  }
}

const transcripts = async config => {
  try {
    return typeof config.transcripts === 'string' ? await request(config.transcripts) : config.transcripts
  } catch (err) {
    console.warn(`Couldn't parse transcripts "${transcripts}", falling back to empty list`)
    return []
  }
}

export const parseConfig = async (input = {}, additional = {}) => {
  let config

  try {
    config = typeof input === 'string' ? await request(input) : input
  } catch (err) {
    throw new Error(`Couldn't parse configuration "${input}"`)
  }

  return mergeDeepRight(
    Object.assign({}, config, {
      media: media(config),
      files: files(config),
      transcripts: await transcripts(config),
      chapters: await chapters(config)
    }),
    additional
  )
}
