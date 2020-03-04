import { curry, map, compose, join, toUpper, juxt, head, tail, identity } from 'ramda'
import { isUndefinedOrNull } from './predicates'

/**
 * Collection of functional helpers
 */

export const inAnimationFrame = func => (...args) =>
  window.requestAnimationFrame(() => func.apply(null, args))

export const asyncAnimation = func => (...args) =>
  new Promise(resolve => {
    window.requestAnimationFrame(resolve(func.apply(null, args)))
  })

export const callWith = (...args) => func => func.apply(null, args)

// Math helpers
export const toInt = (input = 0) => (isNaN(parseInt(input, 10)) ? 0 : parseInt(input, 10))
export const toFloat = (input = 0) => (isNaN(parseFloat(input)) ? 0 : parseFloat(input))

// Functional Helper
export const fallbackTo = fallback => value => (isUndefinedOrNull(value) ? fallback : value)
export const createObject = curry((specification, value) => map(f => f(value), specification))
export const scope = curry((selectors = {}, context = identity) =>
  Object.keys(selectors).reduce(
    (result, key) => ({
      ...result,
      [key]: compose(selectors[key], context)
    }),
    {}
  )
)
export const startsWith = curry((q, str) => str.startsWith(q))
export const endsWith = curry((q, str) => str.endsWith(q))
export const stripl = curry((q, str) => (startsWith(q, str) ? str.slice(q.length) : str))
export const stripr = curry((q, str) =>
  endsWith(q, str) ? str.slice(0, str.length - q.length) : str
)
export const strip = curry((q, str) => stripl(q, stripr(q, str)))
export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]))
