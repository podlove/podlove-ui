import { propOr } from 'ramda'
import { sandbox } from '@podlove/utils/sandbox'
import { setStyles } from '@podlove/utils/dom'

import embedButtonDom from './embed'

export default async (config, entry) => {
  const reference =
    import.meta.env.MODE === 'cdn'
      ? import.meta.env.BASE
      : propOr(import.meta.env.BASE, 'base', config)

  const buttonDom = embedButtonDom({
    version: import.meta.env.VERSION,
    base: reference
  })

  const subscribeButton = await sandbox(entry, buttonDom, { fullWidth: true })
  setStyles({ width: '100%', height: '100%' }, subscribeButton)

  return subscribeButton
}
