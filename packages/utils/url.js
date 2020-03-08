import { compose, propOr, replace } from 'ramda'
import queryString from 'query-string-for-all'
import { stripr } from './helper'

const url = href => {
  try {
    return new URL(href)
  } catch (e) {
    return ''
  }
}

export const hostname = compose(replace(/^(www\.)/, ''), propOr('', 'hostname'), url)
export const pathname = compose(stripr('/'), propOr('', 'pathname'), url)

export const addQueryParameter = (url, additionalParameters = {}) => {
  const parser = document.createElement('a')
  parser.href = url

  const existingParameters = queryString.parse(parser.search)
  parser.search = queryString.stringify(Object.assign({}, existingParameters, additionalParameters))

  return parser.href
}
