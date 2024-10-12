import { isNumber, flow, isNil } from 'lodash-es'
import { toInt, toFloat } from './helper.js'

const timeRegex = new RegExp(/^(?:(\d{1,2}):)?(?:(\d{1,2}):)?(\d{1,2})(?:\.(\d{1,3}))?$/)

// Transforms a h:mm:ss.f or mm:ss.ffff or ss time to milliseconds
export const toPlayerTime = (time: string | number = '0'): number | null => {
  if (isNil(time)) {
    return null;
  }

  if (isNumber(time)) {
    return time as unknown as number;
  }

  const matches = timeRegex.exec(time as string)

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
export const fallbackToZero = (time = 0) => (!isNumber(time) || time < 0 ? 0 : time)

const leadingZero = (time: number): string => (time > 9 ? `${time}` : `0${time}`)

// Transforms milliseconds to (hh:)mm:ss
export const toHumanTime = (time: number | string = 0): string => {
  const value = flow(toInt, fallbackToZero)(time || 0);
  const hours = calcHours(value);
  const minutes = calcMinutes(value);
  const seconds = calcSeconds(value);

  let result = `${leadingZero(minutes)}:${leadingZero(seconds)}`

  if (hours > 0) {
    result = `${hours}:${result}`
  }

  return result
}

export const secondsToMilliseconds: (input: string | number) => number = flow(toFloat, (input) => input * 1000, toInt);
export const millisecondsToSeconds: (input: string | number) => number = flow(toInt, (input) => input / 1000, toFloat);
export const parseDate = (utcDate: string): number => (utcDate ? new Date(utcDate).getTime() : null)

export const calcSeconds: (input: string | number) => number = flow(millisecondsToSeconds, (time = 0) => toInt(time % 60))
export const calcMinutes: (input: string | number) => number = flow(millisecondsToSeconds, (time = 0) => toInt(time / 60) % 60)
export const calcHours: (input: string | number) => number = flow(millisecondsToSeconds, (time = 0) => toInt(time / 3600) % 24)
