import { compose, gt } from 'ramda'
import { luminosity } from 'farbraum'

export { luminosity }
export const isNegative = compose(gt(0.25), luminosity)
export const light = '#fff'
export const dark = '#000'
