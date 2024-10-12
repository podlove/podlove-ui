import Hls from 'hls.js';

import { get } from 'lodash-es';

import {
  AudioStateCurrentData,
  AudioStateEnoughData,
  AudioStateFutureData,
  AudioStateMetaData,
  AudioStateNothing,
  MediaElement,
  MediaProps
} from './types.js';
import { collectProperties } from './utils.js';

const transformBuffered = (buffered: TimeRanges | undefined) => {
  let result: [number, number][] = [];

  if (!buffered) {
    return [];
  }

  for (let i = 0; i < buffered.length; i++) {
    result = [...result, [buffered.start(i), buffered.end(i)]];
  }
  return result;
};

// Media Props
const duration = (input: MediaElement): number => get(input, ['duration'], 0);
const playtime = (input: MediaElement): number | undefined => get(input, ['playtime']);
const buffered = (input: MediaElement): [number, number][] => {
  const buffer = get(input, ['buffered']);

  return transformBuffered(buffer);
};
const volume = (input: MediaElement): number | undefined => get(input, ['volume']);
const ended = (input: MediaElement): boolean | undefined => get(input, ['ended']);
const paused = (input: MediaElement): boolean | undefined => get(input, ['paused']);
const rate = (input: MediaElement): number | undefined => get(input, ['playbackRate']);
const muted = (input: MediaElement): boolean | undefined => get(input, ['muted']);
const src = (input: MediaElement): string | undefined => get(input, ['currentSrc']);
const channels = (input: MediaElement): number | undefined =>
  get(input, ['activeBuffer', 'channelCount']);
const buffer = (input: MediaElement): AudioBuffer | undefined => get(input, ['audioBuffer']);
const initialized = (input: MediaElement): boolean | undefined => get(input, ['initialized']);
const hls = (input: MediaElement): typeof Hls | undefined => get(input, ['hls']);
const liveSync = (input: MediaElement): number | undefined => get(input, ['liveSync']);

const state = (input: MediaElement) => {
  const state: number | undefined = get(input, ['readyState']);
  switch (state) {
    case 0: {
      return AudioStateNothing;
    }
    case 1: {
      return AudioStateMetaData;
    }
    case 2: {
      return AudioStateCurrentData;
    }
    case 3: {
      return AudioStateFutureData;
    }
    case 4: {
      return AudioStateEnoughData;
    }
    default:
      return undefined;
  }
};

const playing = (media: MediaElement): boolean =>
  media && media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2;

const props: (input: MediaElement) => MediaProps = collectProperties({
  duration,
  buffered,
  volume,
  state,
  playtime,
  ended,
  rate,
  muted,
  src,
  paused,
  playing,
  buffer,
  hls,
  liveSync
});

export {
  duration,
  playtime,
  buffered,
  volume,
  ended,
  rate,
  muted,
  state,
  playing,
  paused,
  props,
  src,
  channels,
  initialized,
  hls,
  liveSync
};
