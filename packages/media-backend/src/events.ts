import { curry, flowRight as compose } from 'lodash-es';
import { getNodeFromEvent, collectProperties, toArray } from './utils.js';
import {
  props,
  playtime,
  volume,
  duration,
  rate,
  buffered,
  state,
  initialized,
  liveSync
} from './props.js';
import {
  MediaElement,
  MediaProps,
  ErrorState,
  NetworkStateEmpty,
  NetworkStateNoSource,
  MediaError
} from './types.js';
import { F } from 'ts-toolbelt';

// events
const eventFactory = (
  events: string | string[],
  processor: (a: any) => any = props,
  factoryOptions = {}
): F.Curry<(media: HTMLMediaElement, callback: (input: any) => void, runtimeOptions: { [key: string]: any }) => HTMLMediaElement> =>
  curry((media, callback, runtimeOptions = {}) => {
    toArray(events).forEach((event) => {
      media.addEventListener(
        event,
        compose<[EventTarget], any, any, void>(callback, processor, getNodeFromEvent) as (input: any) => void,
        Object.assign({}, factoryOptions, runtimeOptions)
      );
    });

    return media;
  });

const onLoading = eventFactory('progress', props, {
  once: true
});

const onLoaded = eventFactory(['canplay', 'canplaythrough'], props, {
  once: true
});

const canPlay = eventFactory(['canplay', 'canplaythrough'], props, {
  once: true
});

const onReady = eventFactory(['canplay', 'canplaythrough']);
const onPlay = eventFactory('play');
const onPause = eventFactory('pause');
const onEnd = eventFactory('ended');
const onFilterUpdate = eventFactory('filterUpdated');

const onBufferChange = eventFactory('progress', buffered);
const onBuffering = curry((media: MediaElement, callback, runtimeOptions = {}) => {
  media.addEventListener(
    'waiting',
    (event) => {
      const node = <MediaElement>getNodeFromEvent(event);

      if (state(node) !== 'HAVE_ENOUGH_DATA') {
        callback(props(node));
      }
    },
    Object.assign({}, runtimeOptions)
  );

  return media;
});

const onPlaytimeUpdate = eventFactory('timeupdate', playtime);
const onVolumeChange = eventFactory('volumechange', volume);
const onLiveSyncUpdate = eventFactory('livesyncupdate', liveSync);

const onError = curry(
  (media: MediaElement, callback: (error: ErrorState, detail?: any) => void) => {
    media.addEventListener(
      'error',
      function ({ detail }: any) {
        const networkState = detail && detail.networkState;

        switch (networkState || this.networkState) {
          case HTMLMediaElement.NETWORK_NO_SOURCE:
            return callback(NetworkStateNoSource, {});

          case HTMLMediaElement.NETWORK_EMPTY:
            return callback(NetworkStateEmpty, {});
        }
      },
      true
    );

    media.addEventListener(
      'error-media',
      function ({ detail }: any) {
        const stoppedByUserCodes = [
          0, // safari
          20 // chrome & firefox
        ];

        if (!initialized(media)) {
          return;
        }

        if (stoppedByUserCodes.includes(detail.code)) {
          return;
        }

        callback(MediaError, detail);
      },
      false
    );

    return media;
  }
);

const onDurationChange = eventFactory('durationchange', duration);
const onRateChange = eventFactory('ratechange', rate);

const events: (input: MediaElement) => {
  onLoading: (cb: (args: MediaProps) => void) => void;
  onLoaded: (cb: (args: MediaProps) => void) => void;
  onPause: (cb: (args: MediaProps) => void) => void;
  onBufferChange: (cb: (args: [number, number][]) => void) => void;
  onEnd: (cb: (args: MediaProps) => void) => void;
  onPlaytimeUpdate: (cb: (args: number | undefined) => void) => void;
  onVolumeChange: (cb: (args: number | undefined) => void) => void;
  onError: (cb: (error: ErrorState, detail?: any) => void) => void;
  onDurationChange: (cb: (error: ErrorState, detail?: any) => void) => void;
  onRateChange: (cb: (args: number | undefined) => void) => void;
  onPlay: (cb: (args: MediaProps) => void) => void;
  onBuffering: (cb: (args: MediaProps) => void) => void;
  onReady: (cb: (args: MediaProps) => void) => void;
  onFilterUpdate: (cb: (args: MediaProps) => void) => void;
  canPlay: (cb: (args: MediaProps) => void) => void;
  onLiveSyncUpdate: (cb: (args: number | undefined) => void) => void;
} = collectProperties({
  onLoading,
  onLoaded,
  onPause,
  onBufferChange,
  onEnd,
  onPlaytimeUpdate,
  onVolumeChange,
  onError,
  onDurationChange,
  onRateChange,
  onPlay,
  onBuffering,
  onReady,
  onFilterUpdate,
  canPlay,
  onLiveSyncUpdate
});

export {
  onLoading,
  onLoaded,
  onPause,
  onBufferChange,
  onEnd,
  onPlaytimeUpdate,
  onVolumeChange,
  onError,
  onDurationChange,
  onRateChange,
  onPlay,
  events,
  onBuffering,
  onReady,
  onFilterUpdate,
  canPlay,
  onLiveSyncUpdate
};
