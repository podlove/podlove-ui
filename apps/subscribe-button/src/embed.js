import { prop } from 'ramda'
import { findNode } from '@podlove/utils/dom'
// import { sandboxWindow } from '@podlove/utils/sandbox'
import { waitFor } from '@podlove/utils/exists'

import { init } from '@podlove/button-actions/lifecycle'

import createButton from './app'
import parseConfig from './embed/config'
// import sandbox from './embed/sandbox'
import overlayStyle from './embed/overlay'

async function embed(selector, button, additional) {
  const config = await parseConfig(button, additional)

  const entry = findNode(selector)
  const shadow = entry.attachShadow({ mode: 'closed' })
  const { app, store } = createButton()
  app.mount(shadow)

  store.dispatch(init(config))

  overlayStyle(store, entry)

  return store
}

export default embed
