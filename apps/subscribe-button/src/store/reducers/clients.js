import { handleActions } from 'redux-actions'
import { getPlatform } from '@podlove/utils/useragent'
import getClients from '@podlove/clients'
import { type, platform } from '@podlove/clients/types'
import { head, identity, prop } from 'ramda'

import { INIT } from '@podlove/button-actions/types'
import * as config from '../../config'

export const INITIAL_STATE = []

const clients = payload => {
  const provided = config.clients(payload)
  const feed = config.feed(payload)

  return getClients({ platform: [getPlatform(), platform.web], type: type.app })
    .filter(({ id }) => provided.length === 0 || provided.includes(id))
    .map(item => ({
      title: item.title,
      icon: item.icon,
      install: item.install,
      link: item.scheme(feed),
      type: item.type,
      os: item.os
    }))
}

const services = payload => {
  const provided = config.services(payload)

  return Object.keys(provided)
    .map(id => getClients({ id, type: type.service }))
    .map(head)
    .filter(identity)
    .map(item => ({
      title: item.title,
      icon: item.icon,
      install: item.install,
      link: item.scheme(prop(item.id, provided)),
      type: item.type,
      os: item.os
    }))
}

const rss = payload => {
  const feed = config.feed(payload)

  return getClients({ id: 'rss' }).map(item => ({
    title: item.title,
    icon: item.icon,
    install: item.install,
    link: item.scheme(feed),
    rss: true
  }))
}

export const reducer = handleActions(
  {
    [INIT]: (_, { payload }) =>
      [...clients(payload), ...services(payload), ...rss(payload)].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
  },
  INITIAL_STATE
)
