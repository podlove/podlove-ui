/* eslint-disable no-console */
import { mergeDeepRight, propOr, pathOr } from 'ramda'
import { json } from '@podlove/utils/request'
import * as playerConfig from '@podlove/player-config'

const fetchChapters = async config => {
  try {
    return await json(playerConfig.chapters(config))
  } catch (err) {
    console.warn(`Couldn't parse chapters "${chapters}", falling back to empty list`)
    return []
  }
}

const fetchTranscripts = async config => {
  try {
    return await json(playerConfig.transcripts(config))
  } catch (err) {
    console.warn(`Couldn't parse transcripts "${transcripts}", falling back to empty list`)
    return []
  }
}

const fetchPlaylist = async config => {
  try {
    return json(playerConfig.playlist(config))
  } catch (err) {
    console.warn(`Couldn't parse playlist "${playlist}", falling back to empty list`)
    return []
  }
}

const reference = ({ episode, config }, resolved) => ({
  episode: typeof episode === 'string' ? episode : null,
  config: typeof config === 'string' ? config : null,
  base: propOr(null, 'base', resolved.config),
  share: pathOr(null, ['share', 'outlet'], resolved.config)
})

const features = ({ config }) => ({
  persistTab: pathOr(true, ['features', 'persistTab'], config),
  persistPlaystate: pathOr(true, ['features', 'persistPlaystate'], config)
})

const resolve = async url => {
  try {
    return await json(url)
  } catch (err) {
    throw new Error(`Couldn't parse configuration "${url}"`)
  }
}

export const parseConfig = (episode, config) =>
  Promise.all([resolve(episode), resolve(config)]).then(
    async ([resolvedEpisode, resolvedConfig]) => {
      const [transcripts, chapters, playlist] = await Promise.all([
        fetchTranscripts(resolvedEpisode),
        fetchChapters(resolvedEpisode),
        fetchPlaylist(resolvedConfig)
      ])

      return mergeDeepRight(
        Object.assign({}, resolvedEpisode, {
          transcripts,
          chapters
        }),
        Object.assign({}, resolvedConfig, {
          playlist,
          reference: reference(
            { episode, config },
            { episode: resolvedEpisode, config: resolvedConfig }
          ),
          features: features({ config: resolvedConfig })
        })
      )
    }
  )
