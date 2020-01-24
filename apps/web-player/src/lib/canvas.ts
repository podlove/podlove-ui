import { findNode } from '@podlove/utils/dom'
import { html } from '@podlove/utils/request'
import variant from '../templates'

const fetchTemplate = async (node: HTMLElement): Promise<string> => {
  const templateUrl: string = node.getAttribute('data-template')
  const type: string = node.getAttribute('data-variant')

  if (templateUrl) {
    return await html(templateUrl)
  }

  if (type) {
    return await variant(type)
  }

  if (node.innerHTML) {
    return node.innerHTML
  }

  return variant('xl')
}

export default async selector => {
  const node = findNode(selector)

  return {
    node,
    template: await fetchTemplate(node),

    init() {
      node.innerHTML = ''
    }
  }
}
