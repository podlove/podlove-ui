/* global BASE, STYLES, SCRIPTS, MODE, VERSION */
import { propOr } from 'ramda'
import { sandbox } from '@podlove/utils/sandbox'
import { iframeResizer } from 'iframe-resizer'

// eslint-disable-next-line
import iframeResizerContentWindow from 'raw-loader!iframe-resizer/js/iframeResizer.contentWindow.min.js'
import embedButtonDom from './embed.mustache'

export default async (config, entry) => {
  const reference = MODE === 'cdn' ? BASE : propOr(BASE, 'base', config)

  const buttonDom = embedButtonDom({
    version: VERSION,
    base: reference,
    styles: STYLES,
    scripts: SCRIPTS,
    resizer: iframeResizerContentWindow
  })

  const subscribeButton = await sandbox(entry, buttonDom, { fullWidth: false })

  iframeResizer(
    {
      checkOrigin: false,
      log: false,
      sizeWidth: true,
      sizeHeight: true,
      maxHeight: window.innerHeight - 20
    },
    subscribeButton
  )

  return subscribeButton
}
