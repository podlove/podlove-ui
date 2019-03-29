import { propOr, prop, curry } from 'ramda'
import { setAttributes } from '@podlove/utils/dom'
import { sandbox, sandboxWindow } from '@podlove/utils/sandbox'
import { iframeResizer } from 'iframe-resizer'
// eslint-disable-next-line
import iframeResizerContentWindow from 'raw-loader!iframe-resizer/js/iframeResizer.contentWindow.min.js'
import embedPlayerDom from './embed.mustache'
import { createLoader } from './loader'

const setAccessibilityAttributes = curry((config, node) => {
  const title = `Podlove Web Player${prop('title', config) ? ': ' + prop('title', config) : ''}`

  return setAttributes({
    title,
    'aria-label': title,
    tabindex: 0
  })(node)
})

export const createSandbox = async (config, node) => {
  const reference = propOr(BASE, 'base', config.reference)
  const playerDom = embedPlayerDom({
    base: reference,
    styles: STYLES,
    scripts: SCRIPTS,
    resizer: iframeResizerContentWindow,
    loader: createLoader(config)
  })

  const player = await sandbox(node, playerDom)

  setAccessibilityAttributes(config, player)

  iframeResizer(
    {
      checkOrigin: false,
      log: false
    },
    player
  )

  const store = prop('PODLOVE_STORE', sandboxWindow(player))

  return store
}
