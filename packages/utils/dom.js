import { curry, compose, uniq, concat, join, filter, identity, head } from 'ramda'
import DOMPurify from 'dompurify'

export const findNode = selector =>
  typeof selector === 'string' ? head(document.querySelectorAll(selector)) : selector

export const createNode = tag => document.createElement(tag)
export const appendNode = curry((node, child) => {
  node.appendChild(child)

  return child
})

export const tag = curry((tag, value = '', attributes) => {
  let attr = Object.keys(attributes || {})
    .map(attribute => ` ${attribute}="${attributes[attribute]}"`)
    .join('')
  return `<${tag}${attr}>${value}</${tag}>`
})

export const setStyles = curry((attrs, el) => {
  Object.keys(attrs).forEach(property => {
    el.style[property] = attrs[property]
  })

  return el
})

export const removeStyles = curry((attrs, el) => {
  ;(attrs || []).forEach(attr => {
    el.style.removeProperty(attr)
  })
})

export const getClasses = compose(filter(identity), el => el.className.split(' '))

export const hasOverflow = el => el.scrollWidth > el.clientWidth

export const addClasses = curry((classes = [], el) => {
  el.className = compose(join(' '), uniq, concat(classes), getClasses)(el)

  return el
})

export const removeClasses = curry((classes = [], el) => {
  el.className = compose(
    join(' '),
    filter(className => !~classes.indexOf(className)),
    getClasses
  )(el)

  return el
})

export const sanitize = input => {
  if (!input || typeof window === 'undefined') {
    return input
  }

  const purify = DOMPurify(window)

  // Adds target="_blank" to parsed links
  purify.addHook('afterSanitizeElements', node => {
    if (node.tagName === 'A') {
      node.setAttribute('target', '_blank')
    }

    return node
  })

  return purify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'ul', 'li', 'ol', 'br'],
    ALLOWED_ATTR: ['href', 'target']
  })
}

export const setAttributes = curry((attrs, el) => {
  Object.keys(attrs).forEach(property => {
    el.setAttribute(property, attrs[property])
  })

  return el
})

export const resizeObserver = curry((element, cb) => {
  const observer = new MutationObserver(cb)

  observer.observe(element, { childList: true })
  window.addEventListener('resize', cb)
})
