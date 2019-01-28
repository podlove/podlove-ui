import { curry } from 'ramda'

export const log = curry((prefix, val) => console.log(prefix, val))
