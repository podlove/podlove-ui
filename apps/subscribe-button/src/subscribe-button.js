import { findNode } from '@podlove/utils/dom'
import { init } from '@podlove/button-actions/lifecycle'

import createButton from './app'
import parseConfig from './embed/config'
import overlayStyle from './embed/overlay'

import './env.css'

async function embed(selector, button, additional) {
  const config = await parseConfig(button, additional)

  const entry = findNode(selector)
  const shadow = entry.attachShadow({ mode: 'closed' })

  const styling = document.createElement('link')
  styling.setAttribute('rel', 'stylesheet')
  styling.setAttribute('href', './dist/subscribe-button.css')

  const { app, store } = createButton()
  app.mount(shadow)

  shadow.appendChild(styling)

  store.dispatch(init(config))

  overlayStyle(store, entry)

  return store
}

export default embed
