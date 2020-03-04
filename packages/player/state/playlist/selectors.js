import { compose, find, prop, identity } from 'ramda'

export const list = identity
export const episode = find(({ active }) => active)
export const title = compose(prop('title'), episode)
export const config = compose(prop('config'), episode)
