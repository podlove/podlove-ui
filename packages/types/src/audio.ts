export declare const AudioStateNothing = "HAVE_NOTHING";
export declare const AudioStateMetaData = "HAVE_METADATA";
export declare const AudioStateCurrentData = "HAVE_CURRENT_DATA";
export declare const AudioStateFutureData = "HAVE_FUTURE_DATA";
export declare const AudioStateEnoughData = "HAVE_ENOUGH_DATA";
export declare const NetworkStateNoSource = "NETWORK_NO_SOURCE";
export declare const NetworkStateEmpty = "NETWORK_EMPTY";
export declare const MediaError = "MEDIA_ERROR";
export declare type PodloveWebPlayerAudioError = typeof NetworkStateNoSource | typeof NetworkStateEmpty | typeof MediaError;
export declare type AudioState = typeof AudioStateNothing | typeof AudioStateMetaData | typeof AudioStateCurrentData | typeof AudioStateFutureData | typeof AudioStateEnoughData;

export interface PodloveWebPlayerAudio {
  url: string;
  size: string;
  title?: string;
  mimeType: string;
}

export type PodloveWebPlayerAudioProps = {
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
  hls: undefined | any;
  liveSync: number | undefined;
};
