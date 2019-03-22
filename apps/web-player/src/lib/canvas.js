import { findNode } from '@podlove/utils/dom'

export default selector => {
  const node = findNode(selector)
  const content = node.innerHTML

  return {
    node,

    init () {
      node.innerHTML = ''
    },

    reset () {
      node.innerHTML = content
    }
  }
}
