import { scope } from '@podlove/utils/helper'
import { selectors as subscribeButton } from '@podlove/player-state/subscribe-button'
import root from './root.js'

export default scope(subscribeButton, root.subscribeButton)
