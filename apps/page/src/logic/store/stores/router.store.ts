import { handleActions, createAction, type Action } from 'redux-actions'
import { get } from 'lodash-es'

interface routeToPayload {
  params: {
    id: string;
  };
  path: string;
}

export const actions = {
  routeTo: createAction<routeToPayload>('ROUTE')
}

export interface State {
  id: string | null;
  episode: string | null;
}

export const reducer = handleActions<State, any>(
  {
    [actions.routeTo.toString()]: (_, { payload }: Action<routeToPayload>) => ({
      id: get(payload, ['params', 'id'], null),
      episode: get(payload, 'path', null),
    })
  },
  {
    id: null,
    episode: null
  }
)

export const selectors = {
  id: (state: State) => state.id,
  episode: (state: State) => state.episode,
}
