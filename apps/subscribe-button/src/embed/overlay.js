import { setStyles, removeStyles } from '@podlove/utils/dom'
import { selectOverlayVisible } from '../store/selectors'

const overlayStyles = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center'
}

export default (store, entry) => {
  store.subscribe(() => {
    const state = store.getState()

    if (selectOverlayVisible(state)) {
      setStyles(overlayStyles, entry)
    } else {
      removeStyles(Object.keys(overlayStyles), entry)
    }
  })
}
