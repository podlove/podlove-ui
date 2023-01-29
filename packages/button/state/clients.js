import { handleActions } from 'redux-actions'
import { getPlatform } from '@podlove/utils/useragent'
import getClients from '@podlove/clients'
import { platform, type } from '@podlove/clients/types'
import { INIT } from '@podlove/button-actions/types'
import * as config from '@podlove/button-config'

export const INITIAL_STATE = []

const clients = (payload) => {
  const provided = config.clients(payload)
  const currentPlatform = getPlatform()
  const feed = config.feed(payload)

  return provided
    .map((client) => {
      if (client?.platform === 'custom') {
        return client
      }

      const clients = getClients({ id: client.id, platform: [currentPlatform, platform.web] })

      return clients
        .filter((item) => {
          if (item.type === type.service) {
            !!client.service
          }

          return true
        })
        .map((item) => ({
          ...item,
          link: item.type === type.service ? item.scheme(client.service) : item.scheme(feed)
        }))
        .sort((item) => (item.type === type.service ? -1 : 0))
        .shift()
    })
    .filter(Boolean)
}

export const reducer = handleActions(
  {
    [INIT]: (_, { payload }) => clients(payload)
  },
  INITIAL_STATE
)
