const CLIENTS = {
  'antenna-pod': require('./antenna-pod').default,
  'apple-podcasts': require('./apple-podcasts').default,
  'beyond-pod': require('./beyond-pod').default,
  castro: require('./castro').default,
  clementine: require('./clementine').default,
  deezer: require('./deezer').default,
  downcast: require('./downcast').default,
  'google-podcasts': require('./google-podcasts').default,
  gpodder: require('./gpodder').default,
  'i-catcher': require('./i-catcher').default,
  instacast: require('./instacast').default,
  overcast: require('./overcast').default,
  'player-fm': require('./player-fm').default,
  'pocket-casts': require('./pocket-casts').default,
  'podcast-addict': require('./podcast-addict').default,
  'podcast-republic': require('./podcast-republic').default,
  podcat: require('./podcat').default,
  podscout: require('./podscout').default,
  procast: require('./procast').default,
  rss: require('./rss').default,
  'rss-radio': require('./rss-radio').default,
  soundcloud: require('./soundcloud').default,
  spotify: require('./spotify').default,
  stitcher: require('./stitcher').default,
  youtube: require('./youtube').default,
  castbox: require('./castbox').default
}

const search = ({ id = null, platform = null, title = null, type = null } = {}) => client => {
  const platformMatch = platform ? [].concat(platform).includes(client.platform) : true
  const typeMatch = type ? [].concat(type).includes(client.type) : true
  const titleMatch = title ? client.title.toUpperCase().includes(title.toUpperCase()) : true
  const idMatch = id ? [].concat(id).some(item => item === client.id) : true

  return idMatch && platformMatch && titleMatch && typeMatch
}

export default ({ id, platform, title, type } = {}) =>
  Object.keys(CLIENTS)
    .reduce((result, id) => [...result, ...CLIENTS[id].map(item => ({ id, ...item }))], [])
    .filter(search({ id, type, title, platform }))
