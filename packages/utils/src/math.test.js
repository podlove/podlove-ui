import { toPercent, roundUp, round, interpolate, relativePosition } from './math'

describe('math', () => {
  describe('toPercent()', () => {
    test('should be a function', () => {
      expect(typeof toPercent).toBe('function')
    })

    test(`transforms absolute value to percentage`, () => {
      expect(toPercent()).toBe(0)
      expect(toPercent(1.5)).toBe(150)
    })
  })

  describe('roundUp()', () => {
    test('should be a function', () => {
      expect(typeof roundUp).toBe('function')
    })

    test(`rounds to next full float quantile`, () => {
      expect(roundUp(5, 1)).toBe(1.05)
      expect(roundUp(5, 1.05)).toBe(1.1)
      expect(roundUp(5, 1.06)).toBe(1.1)
    })
  })

  describe('round()', () => {
    test('should be a function', () => {
      expect(typeof round).toBe('function')
    })

    test(`rounds to floats with 2 nachkomma`, () => {
      expect(round()).toBe(0.0)
      expect(round(1)).toBe(1.0)
      expect(round(1.33777777)).toBe(1.34)
    })
  })

  describe('interpolate()', () => {
    test('should be a function', () => {
      expect(typeof interpolate).toBe('function')
    })

    test(`interpolates a given number`, () => {
      expect(interpolate(12.555)).toBe(12.56)
      expect(interpolate(10)).toBe(10)
    })
  })

  describe('relativePosition()', () => {
    test('should be a function', () => {
      expect(typeof relativePosition).toBe('function')
    })

    test(`relativePosition: returns position in percent relative to a maximum value`, () => {
      expect(relativePosition(50, 100)).toBe('50%')
      expect(relativePosition(40, 160)).toBe('25%')
    })
  })
})
