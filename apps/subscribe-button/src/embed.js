import { prop } from 'ramda'
import { findNode } from '@podlove/utils/dom'
import { sandboxWindow } from '@podlove/utils/sandbox'

import { init } from './store/actions'
import parseConfig from './embed/config'
import sandbox from './embed/sandbox'
import overlayStyle from './embed/overlay'

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
