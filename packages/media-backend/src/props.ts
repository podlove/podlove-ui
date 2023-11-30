import Hls from 'hls.js';

import { path, compose, defaultTo } from 'ramda';
import {
  AudioState,
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
const duration = compose<[MediaElement], number | undefined, number>(
  defaultTo(0),
  path(['duration'])
);
const playtime: (input: MediaElement) => number | undefined = path<number>(['playtime']);
const buffered = compose<[MediaElement], TimeRanges | undefined, [number, number][]>(
  transformBuffered,
  path(['buffered'])
);
const volume: (input: MediaElement) => number | undefined = path<number>(['volume']);
const ended: (input: MediaElement) => boolean | undefined = path<boolean>(['ended']);
const paused: (input: MediaElement) => boolean | undefined = path<boolean>(['paused']);
const rate: (input: MediaElement) => number | undefined = path<number>(['playbackRate']);
const muted: (input: MediaElement) => boolean | undefined = path<boolean>(['muted']);
const src: (input: MediaElement) => string | undefined = path<string>(['currentSrc']);
const channels: (input: MediaElement) => number | undefined = path<number>([
  'activeBuffer',
  'channelCount'
]);
const buffer: (input: MediaElement) => AudioBuffer | undefined = path<AudioBuffer>(['audioBuffer']);
const initialized: (input: MediaElement) => boolean | undefined = path<boolean>(['initialized']);
const hls: (input: MediaElement) => typeof Hls | undefined = path<typeof Hls>(['hls']);
const liveSync: (input: MediaElement) => number | undefined = path<number>(['liveSync']);

const state = compose<[MediaElement], number | undefined, AudioState | undefined>(
  (state: number | undefined) => {
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
  },
  path<number>(['readyState'])
);

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
