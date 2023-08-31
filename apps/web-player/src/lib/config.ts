/* eslint-disable no-console */
import { mergeDeepRight, propOr, pathOr } from 'ramda';
import { json } from '@podlove/utils/request';
import * as playerConfig from '@podlove/player-config';
import {
  PodloveSubscribeButtonConfig,
  PodloveTheme,
  PodloveWebPlayerChapter,
  PodloveWebPlayerConfig,
  PodloveWebPlayerEpisode,
  PodloveWebPlayerPlaylistItem,
  PodloveWebPlayerReference,
  PodloveWebPlayerResolvedConfig,
  PodloveWebPlayerTranscript
} from '@podlove/types';

const fetchChapters = async (
  config: PodloveWebPlayerResolvedConfig
): Promise<PodloveWebPlayerChapter[]> => {
  try {
    return await json(playerConfig.chapters(config));
  } catch (err) {
    console.warn(`Couldn't parse chapters, falling back to empty list`);
    return [];
  }
};

const fetchTranscripts = async (
  config: PodloveWebPlayerResolvedConfig
): Promise<PodloveWebPlayerTranscript[]> => {
  try {
    return await json(playerConfig.transcripts(config));
  } catch (err) {
    console.warn(`Couldn't parse transcripts, falling back to empty list`);
    return [];
  }
};

const fetchPlaylist = async (
  config: PodloveWebPlayerResolvedConfig
): Promise<PodloveWebPlayerPlaylistItem[]> => {
  try {
    return json(playerConfig.playlist(config));
  } catch (err) {
    console.warn(`Couldn't parse playlist, falling back to empty list`);
    return [];
  }
};

const reference = (
  { episode, config }: { episode: PodloveWebPlayerEpisode; config: PodloveWebPlayerConfig },
  resolved
): PodloveWebPlayerReference => ({
  episode: typeof episode === 'string' ? episode : null,
  config: typeof config === 'string' ? config : null,
  base: propOr(null, 'base', resolved.config) as unknown as string | null,
  share: pathOr(null, ['share', 'outlet'], resolved.config)
});

const features = ({ config }: { config: PodloveWebPlayerConfig }): { persistTab: boolean, persistPlaystate: boolean } => ({
  persistTab: pathOr(true, ['features', 'persistTab'], config),
  persistPlaystate: pathOr(true, ['features', 'persistPlaystate'], config)
});

const resolve = async (url: string | object): Promise<PodloveWebPlayerResolvedConfig> => {
  try {
    return await json(url) as PodloveWebPlayerResolvedConfig;
  } catch (err) {
    throw new Error(`Couldn't parse configuration "${url}"`);
  }
};

export const parseConfig = (episode: string | PodloveWebPlayerEpisode, config: string | PodloveWebPlayerConfig): Promise<PodloveWebPlayerResolvedConfig> =>
  Promise.all([resolve(episode), resolve(config)]).then(
    async ([resolvedEpisode, resolvedConfig]) => {
      const [transcripts, chapters, playlist] = await Promise.all([
        fetchTranscripts(resolvedEpisode),
        fetchChapters(resolvedEpisode),
        fetchPlaylist(resolvedConfig)
      ]);

      return mergeDeepRight(
        Object.assign({}, resolvedEpisode, {
          transcripts,
          chapters
        }),
        Object.assign({}, resolvedConfig, {
          playlist,
          reference: reference(
            { episode, config } as { episode: PodloveWebPlayerEpisode, config: PodloveWebPlayerConfig },
            { episode: resolvedEpisode, config: resolvedConfig }
          ),
          features: features({ config: resolvedConfig })
        })
      );
    }
  );

  export const subscribeButtonConfig = (config: PodloveWebPlayerResolvedConfig): PodloveSubscribeButtonConfig => {
    const theme = propOr({}, 'theme', config) as PodloveTheme
    const button = propOr({}, 'subscribe-button', config) as PodloveSubscribeButtonConfig
    const runtime = propOr({}, 'runtime', config)

    return {
      theme,
      runtime,
      ...button
    }
  }
