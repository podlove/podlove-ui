import { findNode } from '@podlove/utils/dom'
import { html } from '@podlove/utils/request'
import variant from '../templates'

const fetchTemplate = async node => {
  const templateUrl = node.getAttribute('data-template')
  const type = node.getAttribute('data-variant')

  if (templateUrl) {
    return await html(templateUrl)
  }

  if (type) {
    return await variant(type)
  }

  return node.innerHTML
}

export default async selector => {
  const node = findNode(selector)
  const content = node.innerHTML
  const template = (await fetchTemplate(node)) || (await variant('xl'))

  return {
    node,
    template,

    init() {
      node.innerHTML = ''
    },

    reset() {
      node.innerHTML = content
    }
  }
}
