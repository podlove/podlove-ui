import { findNode } from '@podlove/utils/dom'
import { html } from '@podlove/utils/request'
import variant from '../templates'
import { curry } from 'ramda'

const fetchTemplate = async (node: HTMLElement): Promise<string|null> => {
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

export const x = curry((a,b) => {return a + b});

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
