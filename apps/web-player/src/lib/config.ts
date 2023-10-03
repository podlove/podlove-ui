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
  PodloveWebPlayerFeatures,
  PodloveWebPlayerPlaylistItem,
  PodloveWebPlayerReference,
  PodloveWebPlayerResolvedConfig,
  PodloveWebPlayerTranscript
} from '@podlove/types';

import pkg from '../../package.json';
const fetchChapters = async (
  config: PodloveWebPlayerEpisode
): Promise<PodloveWebPlayerChapter[]> => {
  try {
    return await json(playerConfig.chapters(config));
  } catch (err) {
    console.warn(
      `Podlove Web Player ${pkg.version}`,
      `Couldn't parse chapters, falling back to empty list`
    );
    return [];
  }
};

const fetchTranscripts = async (
  config: PodloveWebPlayerEpisode
): Promise<PodloveWebPlayerTranscript[]> => {
  try {
    return await json(playerConfig.transcripts(config));
  } catch (err) {
    console.warn(
      `Podlove Web Player ${pkg.version}`,
      `Couldn't parse transcripts, falling back to empty list`
    );
    return [];
  }
};

const fetchPlaylist = async (
  config: PodloveWebPlayerConfig
): Promise<PodloveWebPlayerPlaylistItem[]> => {
  try {
    return json(playerConfig.playlist(config));
  } catch (err) {
    console.warn(
      `Podlove Web Player ${pkg.version}`,
      `Couldn't parse playlist, falling back to empty list`
    );
    return [];
  }
};

const fetchReference = async (
  refs: { episode: string; config: string },
  resolved: { episode: PodloveWebPlayerEpisode, config: PodloveWebPlayerConfig }
): Promise<PodloveWebPlayerReference> => ({
  episode: typeof refs.episode === 'string' ? refs.episode : null,
  config: typeof refs.config === 'string' ? refs.config : null,
  share: pathOr(await import.meta.resolve('./share.html'), ['share', 'outlet'], resolved.config)
});

const fetchFeatures = async ({
  config
}: {
  config: PodloveWebPlayerConfig;
}): Promise<PodloveWebPlayerFeatures> => ({
  persistTab: pathOr(true, ['features', 'persistTab'], config),
  persistPlaystate: pathOr(true, ['features', 'persistPlaystate'], config)
});

const resolve = async <T>(
  url: string | object,
  fallback?: any
): Promise<T> => {
  try {
    return (await json(url)) as T;
  } catch (err) {
    console.warn(`Podlove Web Player ${pkg.version}`, `Couldn't parse configuration "${url}"`);
    return fallback;
  }
};

export const parseConfig = (
  episode: string | PodloveWebPlayerEpisode,
  config: string | PodloveWebPlayerConfig
): Promise<PodloveWebPlayerResolvedConfig> =>
  Promise.all([resolve<PodloveWebPlayerEpisode>(episode, {}), resolve<PodloveWebPlayerConfig>(config, {})]).then(
    async ([resolvedEpisode, resolvedConfig]) => {
      const [transcripts, chapters, playlist, reference, features] = await Promise.all([
        fetchTranscripts(resolvedEpisode),
        fetchChapters(resolvedEpisode),
        fetchPlaylist(resolvedConfig),
        fetchReference({ episode: episode as string, config: config as string }, { episode: resolvedEpisode, config: resolvedConfig }),
        fetchFeatures({ config: resolvedConfig })
      ]);

      return mergeDeepRight(
        Object.assign({}, resolvedEpisode, {
          transcripts,
          chapters
        }),
        Object.assign({}, resolvedConfig, {
          playlist,
          reference,
          features
        })
      ) as PodloveWebPlayerResolvedConfig;
    }
  );

export const subscribeButtonConfig = (
  config: PodloveWebPlayerResolvedConfig
): PodloveSubscribeButtonConfig => {
  const theme = propOr({}, 'theme', config) as PodloveTheme;
  const button = propOr({}, 'subscribe-button', config) as PodloveSubscribeButtonConfig;
  const runtime = propOr({}, 'runtime', config);

  return {
    theme,
    runtime,
    ...button
  };
};
