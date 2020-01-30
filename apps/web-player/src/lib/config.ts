/* eslint-disable no-console */
import { mergeDeepRight, propOr, pathOr } from 'ramda'
import { json } from '@podlove/utils/request'
import * as playerConfig from '@podlove/player-config'

const chapters = async (config: playerConfig.Episode.Config): Promise<playerConfig.Episode.Chapters> => {
  try {
    return json<playerConfig.Episode.Chapter[]>(playerConfig.chapters(config))
  } catch (err) {
    console.warn(`Couldn't parse chapters "${chapters}", falling back to empty list`)
    return []
  }
}

const transcripts = async (config: playerConfig.Episode.Config): Promise<playerConfig.Episode.Transcripts> => {
  try {
    return json(playerConfig.transcripts(config))
  } catch (err) {
    console.warn(`Couldn't parse transcripts "${transcripts}", falling back to empty list`)
    return []
  }
}

const playlist = async (config: playerConfig.Player.Config): Promise<playerConfig.Player.Playlist> => {
  try {
    return json(playerConfig.playlist(config))
  } catch (err) {
    console.warn(`Couldn't parse playlist "${playlist}", falling back to empty list`)
    return []
  }
}

const reference = ({ episode, config }, resolved: Resolved) => ({
  episode: typeof episode === 'string' ? episode : null,
  config: typeof config === 'string' ? config : null,
  base: propOr<null, playerConfig.Player.Config, string>(null, 'base', resolved.config),
  share: pathOr(null, ['share', 'outlet'], resolved.config)
})

type Resolved = {
  episode: playerConfig.Episode.Config;
  config: playerConfig.Player.Config;
}

export const parseConfig = async (episode: string, config: string): Promise<playerConfig.CompleteConfig> => {
  const resolved: Resolved = {
    episode: undefined,
    config: undefined
  }

  try {
    resolved.episode = await json<playerConfig.Episode.Config>(episode)
  } catch (err) {
    throw new Error(`Couldn't parse episode configuration "${episode}"`)
  }

  try {
    resolved.config = await json<playerConfig.Player.Config>(config)
  } catch (err) {
    throw new Error(`Couldn't parse player configuration  "${config}"`)
  }

  return mergeDeepRight(
    Object.assign({}, resolved.episode, {
      transcripts: await transcripts(resolved.episode),
      chapters: await chapters(resolved.episode)
    }),
    Object.assign({}, resolved.config, {
      playlist: await playlist(resolved.config),
      reference: reference({ episode, config }, resolved)
    })
  );
}
