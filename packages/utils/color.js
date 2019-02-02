import { compose, gt } from 'ramda'
import color from 'color'

export const luminosity = theme => color(theme).luminosity()
export const isNegative = compose(gt(0.25), luminosity)
export const light = '#fff'
export const dark = '#000'
