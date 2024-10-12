import { flowRight as compose } from 'lodash-es';
import { getNodeFromEvent } from './utils.js';
import { initialized, duration, props } from './props.js';
import { MediaElement } from './types.js';
import Hls from 'hls.js';

/**
 * Node Defaults
 *
 * Disables media defaults
 */

const setMediaDefaults = (node: MediaElement) => {
  node.autoplay = false;
  node.loop = false;
  node.preload = 'auto'; // if set to 'none' this won't trigger canplay events in IE11 or won't play in Safari
  node.controls = false;
  node.playtime = 0;
  node.liveSync = null;
  node.initialized = false;
  node.hls = null;

  return node;
};

/**
 * Playtime Polyfill
 *
 * Adds ability for Safari to set the playtime without the need of loading the full file
 */
const updatePlaytimeToCurrentTime = (media: MediaElement) => {
  media.playtime = media.currentTime;
  return media;
};

const updateCurrentTimeToPlaytime = (media: MediaElement) => {
  if (!media || !initialized(media)) {
    return media;
  }

  try {
    media.currentTime = media.playtime || 0;
  } catch (e) {
    // Nothing happens
  }

  return media;
};

const readyToPlay = (node: MediaElement) => {
  node.initialized = true;

  return node;
};

// HTML Audio implementation 101 quirks: on Safari and iOS you just can set currentTime after loading
const polyfillPlaytime = (node: MediaElement) => {
  node.playtime = 0;

  node.addEventListener('timeupdate', compose(updatePlaytimeToCurrentTime, getNodeFromEvent));

  node.addEventListener(
    'canplay',
    compose(updateCurrentTimeToPlaytime, readyToPlay, getNodeFromEvent),
    { once: true }
  );

  node.addEventListener('play', compose(updateCurrentTimeToPlaytime, getNodeFromEvent));

  return node;
};

// [livesync] polyfill: adds a pointer to the live position
const isLivestream = (node: MediaElement) => duration(node) === Infinity;

const liveSyncPosition = ({
  playtime,
  hls
}: {
  playtime: number | undefined;
  hls: typeof Hls | undefined;
}): number => {
  // not a http live stream
  if (!hls) {
    return 0;
  }

  // syncposition wasn't initialized yet
  if (!(hls as any).liveSyncPosition) {
    return playtime || 0;
  }

  return (hls as any).liveSyncPosition;
};

const addLiveSync = (node: MediaElement) => {
  if (!node) {
    return node;
  }

  const { playtime, hls } = props(node);

  node.liveSync = 0;

  setInterval(() => {
    const sync = liveSyncPosition({ playtime, hls });

    node.liveSync = sync > (node.liveSync || 0) ? sync : node.liveSync;

    node.liveSync = (node.liveSync || 0) + 1;
    node.dispatchEvent(new CustomEvent('livesyncupdate'));
  }, 1000);

  return node;
};

const resetToLivesync = (node: MediaElement) => {
  if (!node) {
    return node;
  }

  let { playtime, liveSync } = props(node);

  playtime = playtime || 0;
  liveSync = liveSync || 0;

  if (playtime > liveSync) {
    return node;
  }

  node.currentTime = liveSync;

  return node;
};

const polifyllLiveSync = (node: MediaElement) => {
  node.addEventListener(
    'canplay',
    (event) => {
      const node = getNodeFromEvent(event);

      if (isLivestream(node)) {
        return addLiveSync(node);
      }

      return node;
    },
    { once: true }
  );

  node.addEventListener(
    'play',
    (event) => {
      const node = getNodeFromEvent(event);

      if (isLivestream(node)) {
        return resetToLivesync(node);
      }

      return node;
    },
    { once: true }
  );

  return node;
};

export const mediaPolyfill = compose(setMediaDefaults, polyfillPlaytime, polifyllLiveSync);
