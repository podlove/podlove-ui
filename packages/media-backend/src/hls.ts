/* global HTMLMediaElement */
import Hls from 'hls.js';
import { compose } from 'ramda';
import { MediaElement, MediaSource } from './types.js';

import { toArray, getMediaSources } from './utils.js';

// See: https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/StreamingMediaGuide/DeployingHTTPLiveStreaming/DeployingHTTPLiveStreaming.html
const hlsSource = compose<[MediaSource[]], MediaSource[], string | null>(
  (sources: MediaSource[]): string | null =>
    sources.reduce(
      (result: string | null, source) =>
        result ||
        ~["application/x-mpegurl", "vnd.apple.mpegurl"].indexOf(
          source.type.toLowerCase()
        )
          ? source.src
          : null,
      null
    ),
  toArray<MediaSource>
);

export const isHLS = (sources: MediaSource[]) => {
  if (!(Hls as any).isSupported()) {
    return false;
  }

  return !!hlsSource(sources);
};

export const attatchStream = (media: MediaElement) => {
  if (!(Hls as any).isSupported()) {
    return media;
  }

  const hls = new (Hls as any)({
    liveDurationInfinity: true,
  });

  const sources = getMediaSources(media);

  const hlsStream = hlsSource(sources);

  if (!hlsStream) {
    return media;
  }

  (media as any).hls = hls;

  hls.attachMedia(media);
  hls.loadSource(hlsStream);

  // Finally start loading
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    hls.startLoad(-1);
  });

  // Translate errors to native media errors
  hls.on(Hls.Events.ERROR, function (_event: any, data: any) {
    switch (data.type) {
      case Hls.ErrorTypes.NETWORK_ERROR:
        hls.startLoad();
        media.dispatchEvent(
          new CustomEvent("error", {
            detail: { networkState: HTMLMediaElement.NETWORK_EMPTY },
          })
        );
        break;
      case Hls.ErrorTypes.OTHER_ERROR:
        hls.destroy();
        media.dispatchEvent(
          new CustomEvent("error", {
            detail: { networkState: HTMLMediaElement.NETWORK_NO_SOURCE },
          })
        );
        break;
      default:
        hls.recoverMediaError();
        break;
    }
  });

  return media;
};
