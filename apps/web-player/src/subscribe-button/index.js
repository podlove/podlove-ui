/* global BASE, BUTTON_STYLES, BUTTON_SCRIPTS, MODE */

import { propOr, prop, path } from 'ramda'
import { sandbox, sandboxWindow } from '@podlove/utils/sandbox'
import { setStyles, removeStyles } from '@podlove/utils/dom'
import template from './template.mustache'

import { version } from '../../package'

export const create = async (config, target) => {
  const reference = MODE === 'cdn' ? BASE : propOr(BASE, 'base', config.reference)

  const dom = template({
    root: reference,
    base: `${version}/button/`,
    styles: BUTTON_STYLES,
    scripts: BUTTON_SCRIPTS
  })

  const button = await sandbox(target.node, dom).then(
    setStyles({ position: 'fixed', width: 0, height: 0, top: 0, left: 0, overflow: 'hidden' })
  )
  const store = prop('PODLOVE_STORE', sandboxWindow(button))

  store.subscribe(() => {
    const visible = path(['view', 'overlay'], store.getState())

    if (visible) {
      setStyles({ width: '100%', height: '100%' }, button)
      setStyles({ overflow: 'hidden' }, document.body)
    } else {
      setTimeout(() => {
        setStyles({ width: 0, height: 0 }, button)
        removeStyles(['overflow'], document.body)
      }, 300)
    }
  })

  return store
}

export const config = config => {
  const theme = propOr({}, 'theme', config)
  const button = propOr({}, 'subscribe-button', config)

  return {
    theme,
    ...button
  }
}
