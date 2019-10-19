import { prop } from 'ramda'
import { findNode } from '@podlove/utils/dom'
import { sandboxWindow } from '@podlove/utils/sandbox'

import { init } from '@podlove/button-actions/lifecycle'
import parseConfig from './src/embed/config'
import sandbox from './src/embed/sandbox'
import overlayStyle from './src/embed/overlay'

async function embed(selector, button, additional) {
  const config = await parseConfig(button, additional)
  const entry = findNode(selector)
  const subscribeButton = await sandbox(config, entry)

  const store = prop('PSB_STORE', sandboxWindow(subscribeButton))

  store.dispatch(init(config))
  overlayStyle(store, entry)

  return store
}

if (typeof window['podloveSubscribeButton'] === 'undefined') {
  window['podloveSubscribeButton'] = embed
}
