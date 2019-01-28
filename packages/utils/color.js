import { curry } from 'ramda'
import color from 'color'

export const luminosity = curry((boundary, theme) => color(theme).luminosity() < boundary)
export const isNegative = luminosity(0.25)
export const light = '#fff'
export const dark = '#000'
