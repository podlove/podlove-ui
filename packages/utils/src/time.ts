import { is, compose } from 'ramda'
import { toInt, toFloat } from './helper.js'
import { isUndefinedOrNull } from './predicates.js'

const timeRegex = new RegExp(/^(?:(\d{1,2}):)?(?:(\d{1,2}):)?(\d{1,2})(?:\.(\d{1,3}))?$/)

// Transforms a h:mm:ss.f or mm:ss.ffff or ss time to milliseconds
export const toPlayerTime = (time: string | number = '0'): number | null => {
  if (isUndefinedOrNull(time)) {
    return null;
  }

  if (is(Number, time)) {
    return time as unknown as number;
  }

  const matches = timeRegex.exec(time)

  if (!matches) {
    return 0
  }

  const hours = toInt(matches[2] ? matches[1] : 0)
  const minutes = toInt(matches[2] ? matches[2] : matches[1] || 0)
  const seconds = toInt(matches[3] || 0)
  const milliseconds = toInt(matches[4] || 0)

  return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds
}

export const localeDate = (timestamp: number, locale: string): string => new Date(timestamp).toLocaleDateString(locale)
export const localeTime = (timestamp: number, locale: string): string =>
  new Date(timestamp).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
export const fallbackToZero = (time = 0) => (!is(Number, time) || time < 0 ? 0 : time)

const leadingZero = (time: number): string => (time > 9 ? `${time}` : `0${time}`)

// Transforms milliseconds to (hh:)mm:ss
export const toHumanTime = (time: number | string = 0): string => {
  const hours = compose(calcHours, fallbackToZero, toInt)(time || 0)
  const minutes = compose(calcMinutes, fallbackToZero, toInt)(time || 0)
  const seconds = compose(calcSeconds, fallbackToZero, toInt)(time || 0)

  let result = `${leadingZero(minutes)}:${leadingZero(seconds)}`

  if (hours > 0) {
    result = `${hours}:${result}`
  }

  return result
}

export const secondsToMilliseconds = compose<any[], number, number, number>(toInt, (input) => input * 1000, toFloat)
export const millisecondsToSeconds = compose<any[], number, number, number>(toFloat, (input) => input / 1000, toInt)
export const parseDate = (utcDate: string): number => (utcDate ? new Date(utcDate).getTime() : null)

export const calcSeconds = compose<any[], number, number>((time = 0) => toInt(time % 60), millisecondsToSeconds)
export const calcMinutes = compose<any[], number, number>((time = 0) => toInt(time / 60) % 60, millisecondsToSeconds)
export const calcHours = compose<any[], number, number>((time = 0) => toInt(time / 3600) % 24, millisecondsToSeconds)
