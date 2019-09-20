import { prop, propOr } from 'ramda'

export const feed = prop('feed')
export const clients = propOr([], 'clients')
export const services = propOr({}, 'services')
export const theme = propOr({}, 'theme')
