import { compose } from 'ramda'
import queryString from 'query-string-for-all'
import { toPlayerTime } from './time'

export const locationParams = () => queryString.parse(window.location.search)

const parseParameters = parameters => {
  const parsed = {}

  if (parameters.t) {
    const [start, stop] = parameters.t.split(',')
    parsed.starttime = typeof start === 'string' ? toPlayerTime(start) : undefined
    parsed.stoptime = typeof stop === 'string' ? toPlayerTime(stop) : undefined
  }

  if (parameters.episode) {
    parsed.episode = parameters.episode
  }

  if (parameters.config) {
    parsed.config = parameters.config
  }

  if (parameters.autoplay) {
    parsed.autoplay = true
  }

  return parsed
}

export const urlParameters = compose(
  parseParameters,
  locationParams
)
