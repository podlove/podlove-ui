import { handleActions, createAction } from 'redux-actions';

export interface State {
  visible: boolean;
}

export const actions = {
  toggleSubscribeOverlay: createAction('TOGGLE_SUBSCRIBE_OVERLAY')
};

export const reducer = handleActions<State, any>(
  {
    [actions.toggleSubscribeOverlay.toString()]: (state) => ({
      ...state,
      visible: !state.visible
    })
  },
  {
    visible: false
  }
);

export const selectors = {
  visible: (state: State) => state.visible
};
