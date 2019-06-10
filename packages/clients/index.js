import overcast from './overcast'
import itunes from './itunes'

const search = ({ os = null, title = null, platform = null } = {}) => client => {
  const osMatch = os ? client.os === os : true
  const platformMatch = platform ? client.platform === platform : true
  const titleMatch = title ? client.title.toUpperCase().includes(title.toUpperCase()) : true

  return osMatch && titleMatch && platformMatch
}

export const clients = ({ os, title, platform } = {}) =>
  [...overcast, ...itunes].filter(search({ os, title, platform }))
