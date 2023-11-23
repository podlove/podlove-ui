import { PodcastClient, PodcastClientType, PodcastPlatform } from './types';

import antennaPod from './antenna-pod';
import applePodcasts from './apple-podcasts';
import beyondPod from './beyond-pod';
import castro from './castro';
import clementine from './clementine';
import deezer from './deezer';
import downcast from './downcast';
import googlePodcasts from './google-podcasts';
import gpodder from './gpodder';
import iCatcher from './i-catcher';
import instacast from './instacast';
import overcast from './overcast';
import playerFm from './player-fm';
import pocketCasts from './pocket-casts';
import podcastAddict from './podcast-addict';
import podcastRepublic from './podcast-republic';
import podcat from './podcat';
import podscout from './podscout';
import procast from './procast';
import rss from './rss';
import rssRadio from './rss-radio';
import soundcloud from './soundcloud';
import spotify from './spotify';
import stitcher from './stitcher';
import youtube from './youtube';
import castbox from './castbox';
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
