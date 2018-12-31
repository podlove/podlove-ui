import { compose, getOr, map } from 'lodash/fp'
import { toPlayerTime } from './time'
import { createObject } from './helper'

export const duration = compose(toPlayerTime, getOr(0, 'duration'))
export const playtime = compose(toPlayerTime, getOr(0, 'playtime'))
export const media = compose(map(createObject({
  url: getOr(null, 'url'),
  size: getOr(0, 'size'),
  title: getOr(null, 'title'),
  mimeType: getOr(null, 'mimeType')
})), getOr([], 'audio'))
