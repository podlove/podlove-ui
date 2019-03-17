import { compose, propOr, replace } from 'ramda'
import queryString from 'query-string'
import { stripr } from './helper'

const url = href => new URL(href)

export const hostname = compose(
  replace(/^(www\.)/, ''),
  propOr('', 'hostname'),
  url
)
export const pathname = compose(
  stripr('/'),
  propOr('', 'pathname'),
  url
)

export const addQueryParameter = (url, additionalParameters = {}) => {
  const parser = document.createElement('a')
  parser.href = url

  const existingParameters = queryString.parse(parser.search)
  parser.search = queryString.stringify(Object.assign({}, existingParameters, additionalParameters), { encode: false })

  return parser.href
}
