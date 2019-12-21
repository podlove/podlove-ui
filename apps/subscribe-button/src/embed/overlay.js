import { setStyles, removeStyles } from '@podlove/utils/dom'
import * as select from 'store/selectors'

const overlayStyles = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
}

export default (store, entry) => {
  store.subscribe(() => {
    const state = store.getState()
    if (select.view.overlay(state)) {
      setStyles(overlayStyles, entry)
    } else {
      removeStyles(Object.keys(overlayStyles), entry)
    }
  })
}
