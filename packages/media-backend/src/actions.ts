import { duration, initialized } from './props.js';
import { MediaActions, MediaElement } from './types.js';
import { collectProperties, parseFloatInput } from './utils.js';

/**
 * ACTIONS
 */

const load = (media: MediaElement) => () => {
  media.load();
  return media;
};

const play = (media: MediaElement) => () => {
  // safe play, fixes inconsistency in media API
  try {
    // Some browsers doesn't implement it as a promise
    const playAction = media.play();

    // some does ~.~
    if (playAction && typeof playAction.catch !== 'undefined') {
      playAction.catch((e) => {
        media.dispatchEvent(new CustomEvent('error-media', { detail: e }));
      });
    }
  } catch (e) {
    console.warn(e);
    media.dispatchEvent(new CustomEvent('error-media', { detail: e }));
  }

  return media;
};

// pause :: MediaElement -> () -> MediaElement
const pause = (media: MediaElement) => () => {
  media.pause();
  return media;
};

// mute :: MediaElement -> () -> MediaElement
const mute = (media: MediaElement) => () => {
  media.muted = true;
  return media;
};

const unmute = (media: MediaElement) => () => {
  media.muted = false;
  return media;
};

const setVolume =
  (media: MediaElement) =>
  (volume: number = 1) => {
    volume = parseFloatInput(volume);
    volume = volume < 0 ? 0 : volume;
    volume = volume > 1 ? 1 : volume;

    media.volume = volume;
    return media;
  };

const setRate =
  (media: MediaElement) =>
  (rate: number = 1) => {
    rate = parseFloatInput(rate);
    rate = rate > 4 ? 4 : rate;
    rate = rate < 0.5 ? 0.5 : rate;
    media.playbackRate = rate;

    return media;
  };

const setPlaytime =
  (media: MediaElement) =>
  (time: number = 0) => {
    const mediaDuration = duration(media);
    time = parseFloatInput(time);
    time = time > mediaDuration ? mediaDuration : time;
    time = time < 0 ? 0 : time;

    if (initialized(media)) {
      media.playtime = time;
      media.currentTime = time;
    } else {
      media.playtime = time;
    }

    return media;
  };

const actions: (input: MediaElement) => MediaActions = collectProperties({
  play,
  pause,
  load,
  setPlaytime,
  mute,
  unmute,
  setVolume,
  setRate
});

export { play, pause, load, setPlaytime, mute, unmute, setVolume, setRate, actions };
