import { Action, handleActions } from 'redux-actions';
import { getPlatform } from '@podlove/utils/useragent';
import getClients from '@podlove/clients';
import { PodcastClient, PodcatcherClientId, platform, type } from '@podlove/clients/types';
import * as config from '@podlove/button-config';
import { init, initPayload } from '@podlove/button-actions/lifecycle';

export type State = PodcastClient[];

export const INITIAL_STATE: State = [];

const clients = (payload: initPayload): PodcastClient[] => {
  const provided = config.clients(payload);
  const currentPlatform = getPlatform();
  const feed = config.feed(payload);

  return provided
    .map((client: PodcastClient & { id: PodcatcherClientId }) => {
      if (client?.platform === 'custom') {
        return client;
      }

      const clients = getClients({ id: client.id, platform: [currentPlatform, platform.web] });

      return clients
        .filter((item) => {
          if (item.type === type.service) {
            return !!client?.service;
          }

          return true;
        })
        .map((item) => ({
          ...item,
          link: item.type === type.service ? item.scheme(client.service) : item.scheme(feed)
        }))
        .sort((item) => (item.type === type.service ? -1 : 0))
        .shift();
    })
    .filter(Boolean);
};

export const reducer = handleActions<State, initPayload>(
  {
    [init.toString()]: (_, { payload }: Action<initPayload>): State => clients(payload)
  },
  INITIAL_STATE
);
