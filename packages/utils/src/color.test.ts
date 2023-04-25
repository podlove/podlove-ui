import { describe, test, expect } from 'vitest';
import { luminosity, isNegative } from './color'

describe('color', () => {
  describe('luminosity()', () => {
    test('should be a function', () => {
      expect(typeof luminosity).toBe('function')
    })

    test('should return 1 if white is provided', () => {
      expect(luminosity('#fff')).toEqual(1)
    })

    test('should return 0 if black is provided', () => {
      expect(luminosity('#000')).toEqual(0)
    })
  })

  describe('isNegative()', () => {
    test('should be a function', () => {
      expect(typeof isNegative).toBe('function')
    })

    test('should return true if color is dark', () => {
      expect(isNegative('#000')).toBe(true)
    })

    test('should return false if color is light', () => {
      expect(isNegative('#fff')).toBe(false)
    })
  })
})
