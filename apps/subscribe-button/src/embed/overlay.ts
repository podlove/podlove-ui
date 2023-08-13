import { Store } from 'redux'
import { setStyles } from '@podlove/utils/dom'
import * as select from '../store/selectors.js'
import State from '../store/state.js'

const visibleStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
}

const hiddenStyle = {
  position: 'fixed',
  width: '0',
  height: '0',
  top: 0,
  left: 0
}

export default (store: Store<State>, entry: HTMLElement): void => {
  setStyles(hiddenStyle, entry)

  store.subscribe(() => {
    const state = store.getState()
    if (select.view.overlay(state)) {
      setStyles(visibleStyle, entry)
    } else {
      setStyles(hiddenStyle, entry)
    }
  })
}
