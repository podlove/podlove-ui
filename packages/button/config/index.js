import { compose, prop, propOr } from 'ramda'

export const feed = prop('feed')
export const clients = propOr([], 'clients')
export const theme = propOr({}, 'theme')

export const runtime = propOr({}, 'runtime')

export const language = compose(prop('language'), runtime)
