import {
  toHumanTime,
  toPlayerTime,
  secondsToMilliseconds,
  millisecondsToSeconds,
  parseDate,
  localeDate,
  localeTime
} from './time'

describe('time', () => {
  describe('toHumanTime()', () => {
    test('should be a function', () => {
      expect(typeof toHumanTime).toBe('function')
    })

    test('tolerates invalid inputs', () => {
      expect(toHumanTime()).toBe('00:00')
      expect(toHumanTime(undefined)).toBe('00:00')
      expect(toHumanTime(null)).toBe('00:00')
      expect(toHumanTime('foooo')).toBe('00:00')
    })

    test('transforms given milliseconds to a time string', () => {
      expect(toHumanTime(60000)).toBe('01:00')
      expect(toHumanTime(3600000)).toBe('1:00:00')
    })
  })

  describe('toPlayerTime()', () => {
    test('should be a function', () => {
      expect(typeof toPlayerTime).toBe('function')
    })

    test('tolerates invalid inputs', () => {
      expect(toPlayerTime()).toBe(0)
      expect(toPlayerTime(undefined)).toBe(0)
      expect(toPlayerTime('foo:oo')).toBe(0)
      expect(toPlayerTime(null)).toBe(null)
    })

    test(`parses hours from hh:mm:ss.f`, () => {
      expect(toPlayerTime('04:8:06.5')).toBe(14886005)
      expect(toPlayerTime('4:8:06.5')).toBe(14886005)
    })

    test(`parses minutes from mm:ss.fff`, () => {
      expect(toPlayerTime('8:06.500')).toBe(486500)
      expect(toPlayerTime('8:06.500')).toBe(486500)
    })

    test(`parses seconds from ss.fff`, () => {
      expect(toPlayerTime('06.500')).toBe(6500)
      expect(toPlayerTime('6.500')).toBe(6500)
      expect(toPlayerTime('6')).toBe(6000)
    })
  })

  describe('secondsToMilliseconds()', () => {
    test('should be a function', () => {
      expect(typeof secondsToMilliseconds).toBe('function')
    })

    test(`transforms seconds to milliseconds`, () => {
      expect(secondsToMilliseconds(1.2)).toBe(1200)
    })
  })

  describe('millisecondsToSeconds()', () => {
    test('should be a function', () => {
      expect(typeof millisecondsToSeconds).toBe('function')
    })

    test(`transforms milliseconds to seconds`, () => {
      expect(millisecondsToSeconds(1200)).toBe(1.2)
    })
  })

  describe('parseDate()', () => {
    test('should return null if a falsy value was provided', () => {
      expect(parseDate()).toEqual(null)
    })

    test('should return time in ms when provided a valid date', () => {
      expect(parseDate('1970-01-01T00:00:00.000Z')).toEqual(0)
    })
  })

  describe('localeDate()', () => {
    test('it should return the localized date portion for en', () => {
      expect(localeDate(0, 'en')).toEqual('1/1/1970')
    })

    test('it should return the localized date portion for de', () => {
      expect(localeDate(0, 'de')).toEqual('1.1.1970')
    })
  })

  describe('localeTime()', () => {
    test('it should return the localized time portion for en', () => {
      expect(localeTime(0, 'en')).toEqual('1:00 AM')
    })

    test('it should return the localized time portion for de', () => {
      expect(localeTime(0, 'de')).toEqual('01:00')
    })
  })
})
