import { get } from 'lodash-es';
import { toPlayerTime } from '@podlove/utils/time';
import type {
  PodloveWebPlayerAudio,
  PodloveWebPlayerChannel,
  PodloveWebPlayerChapter,
  PodloveWebPlayerConfig,
  PodloveWebPlayerFile,
  PodloveWebPlayerReference,
  PodloveWebPlayerEpisode,
  PodloveRuntime,
  PodloveWebPlayerShare,
  PodloveSubscribeButtonConfig,
  PodloveWebPlayerTab,
  PodloveTheme,
  PodloveWebPlayerTranscript,
  PodloveWebPlayerPlaylistItem
} from '@podlove/types';

export const duration = (input: PodloveWebPlayerConfig): number | null =>
  toPlayerTime(get(input, 'duration', '0'));
export const version = (input: PodloveWebPlayerConfig | PodloveWebPlayerEpisode): number | null =>
  get(input, 'version', null);

export const playtime = (input: PodloveWebPlayerConfig): number | null =>
  toPlayerTime(get(input, 'playtime', '0'));

export const media = (input: PodloveWebPlayerEpisode): PodloveWebPlayerAudio[] => {
  const audio = get(input, 'audio', []);

  return audio.map((item) => ({
    url: get(item, 'url', null),
    size: get(item, 'size', 0),
    title: get(item, 'title', null),
    mimeType: get(item, 'mimeType', null)
  }));
};

export const chapters = (input: PodloveWebPlayerEpisode): PodloveWebPlayerChapter[] =>
  get(input, 'chapters', []) as PodloveWebPlayerChapter[];

export const theme = (config: PodloveWebPlayerConfig): PodloveTheme => {
  const theme = get(config, 'theme', {} as PodloveTheme);

  if ([5, 6].includes(version(config))) {
    return {
      tokens: get(theme, 'tokens', {})
    };
  }

  const brand = get(theme, 'main', null);

  if (brand) {
    return {
      tokens: {
        brand
      }
    };
  }

  return {
    tokens: {}
  };
};

export const reference = (input: PodloveWebPlayerEpisode): PodloveWebPlayerReference =>
  get(input, 'reference', {} as PodloveWebPlayerReference);

export const transcripts = (input: PodloveWebPlayerEpisode): PodloveWebPlayerTranscript[] =>
  get(input, 'transcripts', []) as PodloveWebPlayerTranscript[];

export const shareReference = (input: PodloveWebPlayerEpisode): string | null =>
  get(reference(input), 'share', null);

export const originReference = (input: PodloveWebPlayerEpisode): string | null =>
  get(reference(input), 'origin', null);

export const episodeReference = (config: PodloveWebPlayerEpisode): string | null => {
  const ref = reference(config);

  if ([5, 6].includes(version(config))) {
    return get(ref, 'episode', null);
  }

  return get(ref, 'config', null);
};

export const configReference = (config: PodloveWebPlayerEpisode): string | null => {
  const ref = reference(config);

  if ([5, 6].includes(version(config))) {
    return get(ref, 'config', null);
  }

  return null;
};

export const validate = (config: PodloveWebPlayerEpisode): boolean => {
  if (media(config).length === 0) {
    return false;
  }

  // Add further validations here 👇

  return true;
};

export const runtime = (input: PodloveWebPlayerConfig): PodloveRuntime =>
  get(input, 'runtime', {} as PodloveRuntime);

export const language = (input: PodloveWebPlayerConfig): string =>
  get(runtime(input), 'language', 'en');

export const platform = (input: PodloveWebPlayerConfig): string => get(runtime(input), 'platform');

export const playlist = (input: PodloveWebPlayerConfig): PodloveWebPlayerPlaylistItem[] =>
  get(input, 'playlist', []) as PodloveWebPlayerPlaylistItem[];

export const files = (
  config: PodloveWebPlayerEpisode
): (PodloveWebPlayerFile | PodloveWebPlayerAudio)[] => {
  return get(config, 'files', media(config))
    .filter(({ url }) => !!url)
    .reduce(
      (result: PodloveWebPlayerFile[], item) => [
        ...result,
        ...(result.some(({ url }) => url === item.url) ? [] : [item])
      ],
      []
    );
};

export const activeTab = (input: PodloveWebPlayerConfig): PodloveWebPlayerTab =>
  get(input, 'activeTab');

export const subscribeButton = (input: PodloveWebPlayerConfig): PodloveSubscribeButtonConfig =>
  get(input, 'subscribe-button');

export const share = (input: PodloveWebPlayerConfig): PodloveWebPlayerShare =>
  get(input, 'share', {});

export const channels = (input: PodloveWebPlayerConfig): PodloveWebPlayerChannel[] =>
  get(share(input), 'channels', []);

export const sharePlaytime = (input: PodloveWebPlayerConfig): boolean =>
  get(share(input), 'sharePlaytime', false);
