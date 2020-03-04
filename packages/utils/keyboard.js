import { compose, propOr, prop } from 'ramda'
import keycode from 'keycode'

const filterGlobal = callback => evt => {
  const target = prop('nodeName', evt.target)

  if (target !== 'BODY') {
    return
  }

  callback(evt)
}

const parseKey = evt => ({
  key: keycode(evt),
  ctrl: propOr(false, 'ctrlKey', evt),
  shift: propOr(false, 'shiftKey', evt),
  meta: propOr(false, 'metaKey', evt),
  alt: propOr(false, 'altKey', evt)
})

export const keydown = callback =>
  document.addEventListener('keydown', filterGlobal(compose(callback, parseKey)))
export const keyup = callback =>
  document.addEventListener('keyup', filterGlobal(compose(callback, parseKey)))
