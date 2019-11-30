import { curry } from 'ramda'

const STORE = window.localStorage

const selector = curry((scope, key) => [scope, key].join('\x00'))
const notFound = selector => {
  const error = new Error(`Not Found [${selector}]`)

  return {
    ...error,
    notFound: true,
    key: selector
  }
}

export default scope => ({
  selector: selector(scope),

  get(key) {
    const selector = this.selector(key)

    if (!STORE[selector]) {
      return [notFound(selector)]
    }

    try {
      return [null, JSON.parse(STORE[selector])]
    } catch (err) {
      return [err]
    }
  },

  put(key, value) {
    if (typeof value === 'undefined') {
      return [new Error(`Invalid parameters to put, ('${key}', undefined)`)]
    }

    try {
      const selector = this.selector(key)

      return [null, (STORE[selector] = JSON.stringify(value))]
    } catch (err) {
      return [err]
    }
  }
})
