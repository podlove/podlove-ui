import { prop, compose } from 'ramda'

export const list = prop('list')
export const next = prop('next')
export const previous = prop('previous')
export const current = prop('current')
export const title = compose(prop('title'), current)
export const image = compose(prop('image'), current)
