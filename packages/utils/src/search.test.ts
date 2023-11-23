import { describe, test, expect } from 'vitest';
import { binarySearch, textSearch } from './search.js'

describe('search', () => {
  describe('binarySearch()', () => {
    const data = [1, 3, 5, 7, 9, 11, 13, 15]

    test('should return the index of an item', () => {
      expect(binarySearch(data, 2)).toEqual(0)
      expect(binarySearch(data, 3)).toEqual(1)
      expect(binarySearch(data, 8)).toEqual(3)
    })

    test('should return the length if elements in array are smaller', () => {
      expect(binarySearch(data, 16)).toEqual(7)
    })

    test('should return -1 if the element is smaller than the elements in array', () => {
      expect(binarySearch(data, -2)).toEqual(-1)
    })
  })

  describe('textSearch()', () => {
    const data = ['foo', 'bar bar', 'baz']

    test('should return the index of a search element', () => {
      expect(textSearch(data, 'foo')).toEqual([0])
    })

    test('should return multiple search hits', () => {
      expect(textSearch(data, 'bar')).toEqual([1, 1])
    })

    test('should return an empty array', () => {
      expect(textSearch(data, 'blaa')).toEqual([])
    })
  })
})
