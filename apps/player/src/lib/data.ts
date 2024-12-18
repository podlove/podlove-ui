/* eslint-disable no-console */
import { get } from 'lodash-es';
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
  config: PodloveWebPlayerConfig
): Promise<PodloveWebPlayerReference> => ({
  episode: typeof refs.episode === 'string' ? refs.episode : null,
  config: typeof refs.config === 'string' ? refs.config : null,
  share: get(config, ['share', 'outlet'], await import.meta.resolve('./share.html'))
});

const fetchFeatures = async (
  config: PodloveWebPlayerConfig
): Promise<PodloveWebPlayerFeatures> => ({
  persistTab: get(config, ['features', 'persistTab'], true),
  persistPlaystate: get(config, ['features', 'persistPlaystate'], true)
});

const resolve = async <T>(url: string | object, fallback?: any): Promise<T> => {
  try {
    return (await json(url)) as T;
  } catch (err) {
    console.warn(`Podlove Web Player ${pkg.version}`, `Couldn't parse configuration "${url}"`);
    return fallback;
  }
};

export const subscribeButtonConfig = (
  config: PodloveWebPlayerConfig
): PodloveSubscribeButtonConfig => {
  const theme = get(config, 'theme', {}) as PodloveTheme;
  const button = get(config, 'subscribe-button', {}) as PodloveSubscribeButtonConfig;
  const runtime = get(config, 'runtime', {});

  return {
    theme,
    runtime,
    ...button
  };
};

export const parseEpisode = async (input: string | PodloveWebPlayerEpisode) =>
  resolve<PodloveWebPlayerEpisode>(input, {}).then(async (episode) => {
    const [transcripts, chapters] = await Promise.all([
      fetchTranscripts(episode),
      fetchChapters(episode)
    ]);

    return Object.assign({}, episode, {
      transcripts,
      chapters
    });
  });

export const parseConfig = async (
  input: string | PodloveWebPlayerConfig,
  episode: string | PodloveWebPlayerEpisode
) =>
  resolve<PodloveWebPlayerConfig>(input, {}).then(async (config) => {
    const [playlist, reference, features] = await Promise.all([
      fetchPlaylist(config),
      fetchReference({ episode: episode as string, config: input as string }, config),
      fetchFeatures(config)
    ]);

    return Object.assign({}, config, {
      playlist,
      reference,
      features
    }) as PodloveWebPlayerConfig;
  });
