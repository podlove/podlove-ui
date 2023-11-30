import Hls from 'hls.js';

export interface MediaElement extends HTMLMediaElement {
  playtime?: number;
  hls?: typeof Hls | null;
  liveSync?: number | null;
  initialized?: boolean;
}

export const AudioStateNothing = 'HAVE_NOTHING';
export const AudioStateMetaData = 'HAVE_METADATA';
export const AudioStateCurrentData = 'HAVE_CURRENT_DATA';
export const AudioStateFutureData = 'HAVE_FUTURE_DATA';
export const AudioStateEnoughData = 'HAVE_ENOUGH_DATA';

export const NetworkStateNoSource = 'NETWORK_NO_SOURCE';
export const NetworkStateEmpty = 'NETWORK_EMPTY';
export const MediaError = 'MEDIA_ERROR';

export type ErrorState = typeof NetworkStateNoSource | typeof NetworkStateEmpty | typeof MediaError;

export type AudioState =
  | typeof AudioStateNothing
  | typeof AudioStateMetaData
  | typeof AudioStateCurrentData
  | typeof AudioStateFutureData
  | typeof AudioStateEnoughData;

export interface MediaSource {
  src: string;
  type: string;
  title?: string;
}

export interface MediaProps {
  duration: number | undefined;
  buffered: [number, number][];
  volume: number | undefined;
  state: AudioState | undefined;
  playtime: number | undefined;
  ended: undefined | boolean;
  rate: undefined | number;
  muted: undefined | boolean;
  src: undefined | string;
  paused: undefined | boolean;
  playing: undefined | boolean;
  buffer: undefined | AudioBuffer;
  hls: undefined | typeof Hls;
  liveSync: number | undefined;
}

export type MediaAction =
  | 'play'
  | 'pause'
  | 'load'
  | 'setPlaytime'
  | 'mute'
  | 'unmute'
  | 'setVolume'
  | 'setRate';

export interface MediaActions {
  play: () => MediaElement;
  pause: () => MediaElement;
  load: () => MediaElement;
  setPlaytime: (time: number) => MediaElement;
  mute: () => MediaElement;
  unmute: () => MediaElement;
  setVolume: (volume: number) => MediaElement;
  setRate: (rate: number) => MediaElement;
}

export type MediaEvent =
  | 'onLoading'
  | 'onLoaded'
  | 'onPause'
  | 'onBufferChange'
  | 'onEnd'
  | 'onPlaytimeUpdate'
  | 'onLiveSyncUpdate'
  | 'onVolumeChange'
  | 'onError'
  | 'onDurationChange'
  | 'onRateChange'
  | 'onPlay'
  | 'onBuffering'
  | 'onReady'
  | 'onFilterUpdate';
