import { PodcastClient, PodcastClientType, PodcastPlatform } from './types.js';

import antennaPod from './antenna-pod/index.js';
import applePodcasts from './apple-podcasts/index.js';
import beyondPod from './beyond-pod/index.js';
import castro from './castro/index.js';
import clementine from './clementine/index.js';
import deezer from './deezer/index.js';
import downcast from './downcast/index.js';
import googlePodcasts from './google-podcasts/index.js';
import gpodder from './gpodder/index.js';
import iCatcher from './i-catcher/index.js';
import instacast from './instacast/index.js';
import overcast from './overcast/index.js';
import playerFm from './player-fm/index.js';
import pocketCasts from './pocket-casts/index.js';
import podcastAddict from './podcast-addict/index.js';
import podcastRepublic from './podcast-republic/index.js';
import podcat from './podcat/index.js';
import podscout from './podscout/index.js';
import procast from './procast/index.js';
import rss from './rss/index.js';
import rssRadio from './rss-radio/index.js';
import soundcloud from './soundcloud/index.js';
import spotify from './spotify/index.js';
import stitcher from './stitcher/index.js';
import youtube from './youtube/index.js';
import castbox from './castbox/index.js';
import { PodcatcherClientId } from './types.js';

export const CLIENTS = {
  'antenna-pod': antennaPod,
  'apple-podcasts': applePodcasts,
  'beyond-pod': beyondPod,
  castro: castro,
  clementine: clementine,
  deezer: deezer,
  downcast: downcast,
  'google-podcasts': googlePodcasts,
  gpodder: gpodder,
  'i-catcher': iCatcher,
  instacast: instacast,
  overcast: overcast,
  'player-fm': playerFm,
  'pocket-casts': pocketCasts,
  'podcast-addict': podcastAddict,
  'podcast-republic': podcastRepublic,
  podcat: podcat,
  podscout: podscout,
  procast: procast,
  rss: rss,
  'rss-radio': rssRadio,
  soundcloud: soundcloud,
  spotify: spotify,
  stitcher: stitcher,
  youtube: youtube,
  castbox: castbox
};

const match = <T>(matchers: null | T | T[], search: T): boolean => {
  if (!matchers) {
    return true;
  }

  if (Array.isArray(matchers)) {
    return matchers.includes(search);
  }

  return matchers === search;
};

const search =
  ({
    id = null,
    platform = null,
    title = null,
    type = null
  }: {
    id?: string | string[] | null;
    platform?: PodcastPlatform | PodcastPlatform[] | null;
    title?: string | null;
    type?: PodcastClientType | PodcastClientType[] | null;
  } = {}) =>
  (client: PodcastClient & { id: string }) => {
    const platformMatch = match(platform, client.platform);
    const typeMatch = match(type, client.type);
    const titleMatch = title
      ? (client.title || '').toUpperCase().includes(title.toUpperCase())
      : true;
    const idMatch = match(id, client.id);

    return idMatch && platformMatch && titleMatch && typeMatch;
  };

export default ({
  id,
  platform,
  title,
  type
}: {
  id?: PodcatcherClientId;
  platform?: PodcastPlatform | PodcastPlatform[];
  title?: string;
  type?: PodcastClientType | PodcastClientType[];
} = {}) =>
  Object.keys(CLIENTS)
    .reduce(
      (result: (PodcastClient & { id: string })[], id) => [
        ...result,
        ...CLIENTS[id].map((item) => ({ id, ...item }))
      ],
      []
    )
    .filter(search({ id, type, title, platform }));
