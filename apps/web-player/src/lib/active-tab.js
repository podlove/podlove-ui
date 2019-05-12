import { toggleTab } from '@podlove/player-actions/tabs'
import { propOr, keys, compose, filter, identity, head } from 'ramda'

const getTab = compose(
  head,
  keys,
  filter(identity),
  propOr({}, 'tabs')
)

export const activeTab = (config, store) => {
  const tab = getTab(config)

  if (tab) {
    store.dispatch(toggleTab(tab))
  }
}
