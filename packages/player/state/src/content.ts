import { Action, handleActions } from 'redux-actions'

import { PodloveWebPlayerContent } from '@podlove/types';
import { selectContent, selectContentPayload } from '@podlove/player-actions/share'

export type State = PodloveWebPlayerContent;

export const INITIAL_STATE: State = 'episode'

const update = (state, content) =>
  ['show', 'episode', 'chapter', 'time'].includes(content) ? content : state

export const reducer = handleActions<State, selectContentPayload>(
  {
    [selectContent.toString()]: (state, { payload }: Action<selectContentPayload>) => update(state, payload)
  },
  INITIAL_STATE
)

export const selectors = {
  content: (state: State) => state
}
