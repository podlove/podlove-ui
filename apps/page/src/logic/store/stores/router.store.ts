
import { last } from 'lodash-es';
import { createAction, handleActions, type Action } from 'redux-actions';
import { actions as runtimeActions } from "./runtime.store";

export interface State {
  path: string[];
  customDomain: boolean;
}

export type navigatePayload = string[];
export type setRoutePayload = string[];
export interface episodePagePayload {
  base: string;
  episodeId: string;
};

export const actions = {
  navigate: createAction<navigatePayload>('ROUTE_NAVIGATE'),
  setRoute: createAction<setRoutePayload>('ROUTE_SET'),
  episodePage: createAction<episodePagePayload>('ROUTE_EPISODE_PAGE'),
};

const updatePath = (state: State, { payload }: Action<string[]>) => ({
  ...state,
  path: payload
});

export const reducer = handleActions<State, any>(
  {
    [runtimeActions.initializeApp.toString()]: (state, action: ReturnType<typeof runtimeActions.initializeApp>) => ({
      ...state,
      customDomain: action.payload.customDomain
    }),
    [actions.navigate.toString()]: updatePath,
    [actions.setRoute.toString()]: updatePath
  },
  { path: [], customDomain: true }
);

export const selectors = {
  episodeId: (state: State): string | null => {
    if (!state.path.includes('episode')) {
      return null
    }

    return last(state.path) || null;
  },
  segment: (state: State) => {
    switch (true) {
      case state.path.includes('episode'):
        return 'episode';

      default:
        return 'index';
    }
  },
  base: (state: State): string | null => {
    switch (true) {
      case state.path.includes('feed'):
        return '/feed';

      default:
        return null;
    }
  },
  customDomain: (state: State) => state.customDomain
};
