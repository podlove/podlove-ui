import antennaPod from './antenna-pod'
import applePodcasts from './apple-podcasts'
import beyondPod from './beyond-pod'
import castro from './castro'
import clementine from './clementine'
import deezer from './deezer'
import downcast from './downcast'
import googlePodcasts from './google-podcasts'
import gpodder from './gpodder'
import iCatcher from './i-catcher'
import instacast from './instacast'
import overcast from './overcast'
import playerFm from './player-fm'
import pocketCasts from './pocket-casts'
import podcastAddict from './podcast-addict'
import podcastRepublic from './podcast-republic'
import podcat from './podcat'
import podscout from './podscout'
import procast from './procast'
import rss from './rss'
import rssRadio from './rss-radio'
import soundcloud from './soundcloud'
import spotify from './spotify'
import stitcher from './stitcher'
import youtube from './youtube'
import castbox from './castbox'

const CLIENTS = {
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
}

const search =
  ({ id = null, platform = null, title = null, type = null } = {}) =>
  (client) => {
    const platformMatch = platform ? [].concat(platform).includes(client.platform) : true
    const typeMatch = type ? [].concat(type).includes(client.type) : true
    const titleMatch = title ? client.title.toUpperCase().includes(title.toUpperCase()) : true
    const idMatch = id ? [].concat(id).some((item) => item === client.id) : true

    return idMatch && platformMatch && titleMatch && typeMatch
  }

export default ({ id, platform, title, type } = {}) =>
  Object.keys(CLIENTS)
    .reduce((result, id) => [...result, ...CLIENTS[id].map((item) => ({ id, ...item }))], [])
    .filter(search({ id, type, title, platform }))
