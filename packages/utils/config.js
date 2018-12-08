import { compose, getOr } from 'lodash/fp'
import { toPlayerTime } from './time'

export const duration = compose(toPlayerTime, getOr(0, 'duration'))
export const playtime = compose(toPlayerTime, getOr(0, 'playtime'))
