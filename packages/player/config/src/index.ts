import { compose, map, prop, propOr } from 'ramda';
import { toPlayerTime } from '@podlove/utils/time';
import { createObject } from '@podlove/utils/helper';
import type {
  PodloveWebPlayerAudio,
  PodloveWebPlayerChannel,
  PodloveWebPlayerChapter,
  PodloveWebPlayerConfig,
  PodloveWebPlayerFile,
  PodloveWebPlayerReference,
  PodloveWebPlayerResolvedConfig,
  PodloveRuntime,
  PodloveWebPlayerShare,
  PodloveWebPlayerSubscribeButton,
  PodloveWebPlayerTab,
  PodloveTheme,
  PodloveWebPlayerTranscript,
  PodloveWebPlayerPlaylistItem
} from '@podlove/types';

export const duration = compose<any[], string, number | null>(
  toPlayerTime,
  propOr('0', 'duration') as (input: PodloveWebPlayerConfig) => string
);

export const version = propOr<string | null>(null, 'version');

export const playtime = compose<any[], string, number | null>(
  toPlayerTime,
  propOr('0', 'playtime') as (input: PodloveWebPlayerConfig) => string
);

export const media = compose<any[], PodloveWebPlayerAudio[], PodloveWebPlayerAudio[]>(
  map(
    createObject({
      url: propOr(null, 'url'),
      size: propOr(0, 'size'),
      title: propOr(null, 'title'),
      mimeType: propOr(null, 'mimeType')
    }) as (input: any) => PodloveWebPlayerAudio
  ),
  propOr([], 'audio')
);

export const chapters = propOr([], 'chapters') as (input: PodloveWebPlayerResolvedConfig) => PodloveWebPlayerChapter[];

export const theme = (config: PodloveWebPlayerConfig): PodloveTheme => {
  const theme = propOr({}, 'theme', config) as (
    input: PodloveWebPlayerConfig
  ) => PodloveTheme;

  if (version(config) === 5) {
    return {
      tokens: propOr({}, 'tokens', theme),
      fonts: propOr({}, 'fonts', theme)
    };
  }

  const brand = propOr(null, 'main', theme) as string;

  if (brand) {
    return {
      tokens: {
        brand
      },
      fonts: {}
    };
  }

  return {
    tokens: {},
    fonts: {}
  };
};

export const reference = propOr({}, 'reference') as (
  input: PodloveWebPlayerResolvedConfig
) => PodloveWebPlayerReference;
export const transcripts = propOr([], 'transcripts') as (
  input: PodloveWebPlayerConfig
) => PodloveWebPlayerTranscript[];
export const shareReference = compose(
  propOr(null, 'share') as (input: PodloveWebPlayerReference) => string | null,
  reference
);

export const originReference = compose(
  propOr(null, 'origin') as (input: PodloveWebPlayerReference) => string | null,
  reference
);

export const episodeReference = (config: PodloveWebPlayerResolvedConfig): string | null => {
  const ref = reference(config);

  if (version(config) === 5) {
    return propOr(null, 'episode', ref);
  }

  return propOr(null, 'config', ref);
};

export const configReference = (config: PodloveWebPlayerResolvedConfig): string | null => {
  const ref = reference(config);

  if (version(config) === 5) {
    return propOr(null, 'config', ref);
  }

  return null;
};

export const validate = (config: PodloveWebPlayerResolvedConfig): boolean => {
  if (media(config).length === 0) {
    return false;
  }

  // Add further validations here 👇

  return true;
};

export const runtime = propOr({}, 'runtime') as (
  input: PodloveWebPlayerConfig
) => PodloveRuntime;

export const language = compose<any[], PodloveRuntime, string>(
  prop('language') as (input: PodloveRuntime) => string,
  runtime
);
export const platform = compose(prop('platform'), runtime);

export const playlist = propOr([], 'playlist') as (
  input: PodloveWebPlayerResolvedConfig
) => PodloveWebPlayerPlaylistItem[];

export const files = (config: PodloveWebPlayerResolvedConfig): PodloveWebPlayerFile[] => {
  const files: PodloveWebPlayerFile[] = propOr(media(config), 'files', config);
  return files
    .filter(({ url }) => !!url)
    .reduce(
      (result: PodloveWebPlayerFile[], item) => [
        ...result,
        ...(result.some(({ url }) => url === item.url) ? [] : [item])
      ],
      []
    );
};

export const activeTab = prop('activeTab') as (
  input: PodloveWebPlayerConfig
) => PodloveWebPlayerTab;

export const subscribeButton = prop('subscribe-button') as (
  input: PodloveWebPlayerConfig
) => PodloveWebPlayerSubscribeButton;

export const share = propOr({}, 'share') as (
  input: PodloveWebPlayerConfig
) => PodloveWebPlayerShare;

export const channels = compose<any[], PodloveWebPlayerShare, PodloveWebPlayerChannel[]>(
  propOr([], 'channels') as (input: PodloveWebPlayerShare) => PodloveWebPlayerChannel[],
  share
);

export const sharePlaytime = compose<any[], PodloveWebPlayerShare, boolean>(
  propOr(false, 'sharePlaytime') as (input: PodloveWebPlayerShare) => boolean,
  share
);
