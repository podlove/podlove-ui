import { compose, propOr, replace } from 'ramda'
import { stripr } from './helper'

const url = href => new URL(href)

export const hostname = compose(replace(/^(www\.)/, ''), propOr('', 'hostname'), url)
export const pathname = compose(stripr('/'), propOr('', 'pathname'), url)
