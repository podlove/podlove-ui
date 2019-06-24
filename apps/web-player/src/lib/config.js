/* eslint-disable no-console */
import { mergeDeepRight, propOr, uniqWith, concat, eqProps } from 'ramda'
import { json } from '@podlove/utils/request'
import * as playerConfig from '@podlove/utils/config'

const media = config => {
  const media = propOr([], 'media', config)
  const audio = propOr([], 'audio', config)
  const video = propOr([], 'video', config)

  return uniqWith(eqProps('url'), concat(media, audio, video, audio))
}

const files = media

const chapters = async config => {
  try {
    return json(playerConfig.chapters(config))
  } catch (err) {
    console.warn(`Couldn't parse chapters "${chapters}", falling back to empty list`)
    return []
  }
}

const transcripts = async config => {
  try {
    return json(playerConfig.transcripts(config))
  } catch (err) {
    console.warn(`Couldn't parse transcripts "${transcripts}", falling back to empty list`)
    return []
  }
}

const playlist = async config => {
  try {
    return json(playerConfig.playlist(config))
  } catch (err) {
    console.warn(`Couldn't parse playlist "${playlist}", falling back to empty list`)
    return []
  }
}

export const parseConfig = async (episode, config) => {
  const resolved = {
    episode: {},
    config: {}
  }

  try {
    resolved.episode = await json(episode)
  } catch (err) {
    throw new Error(`Couldn't parse episode configuration "${episode}"`)
  }

  try {
    resolved.config = await json(config)
  } catch (err) {
    throw new Error(`Couldn't parse player configuration  "${config}"`)
  }

  return mergeDeepRight(
    Object.assign({}, resolved.episode, {
      media: media(resolved.episode),
      files: files(resolved.episode),
      transcripts: await transcripts(resolved.episode),
      chapters: await chapters(resolved.episode)
    }),
    Object.assign({}, resolved.config, {
      playlist: await playlist(resolved.config)
    })
  )
}
