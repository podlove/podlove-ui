import queryString from 'query-string'

export const locationParams = queryString.parse(window.location.search)

const parseParameters = parameters => {
  const parsed = {}

  if (parameters.t) {
    const [start, stop] = parameters.t.split(',')
    parsed.starttime = isString(start) ? toPlayerTime(start) : undefined
    parsed.stoptime = isString(stop) ? toPlayerTime(stop) : undefined
  }

  if (parameters.episode) {
    parsed.episode = parameters.episode
  }

  if (parameters.autoplay) {
    parsed.autoplay = true
  }

  return parsed
}

export const urlParameters = { ...parseParameters(locationParams) }
