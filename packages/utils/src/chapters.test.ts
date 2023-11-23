import { describe, test, expect, beforeEach } from 'vitest';
import { currentChapter, currentChapterIndex, currentChapterByPlaytime } from './chapters.js'

describe('chapters', () => {
  let inactiveChapter, activeChapter, additionalChapter

  beforeEach(() => {
    inactiveChapter = {
      start: 0,
      end: 3600,
      title: 'Inactive Chapter',
      active: false
    }

    activeChapter = {
      start: 3600,
      end: 7200,
      title: 'Active Chapter',
      active: true
    }

    additionalChapter = {
      start: 7200,
      end: 9000,
      title: 'Additional Chapter',
      active: false
    }
  })

  describe('currentChapter()', () => {
    test('should be a function', () => {
      expect(typeof currentChapter).toBe('function')
    })

    test('should return undefined if no matches', () => {
      expect(currentChapter([])).toEqual({
        start: null,
        end: null,
        href: null,
        title: null,
        index: -1
      })
    })

    test('should find the active chapter in a list', () => {
      expect(currentChapter([inactiveChapter, activeChapter])).toEqual(activeChapter)
    })
  })

  describe('currentChapterIndex()', () => {
    test('should be a function', () => {
      expect(typeof currentChapterIndex).toBe('function')
    })

    test('should return undefined if no matches', () => {
      expect(currentChapterIndex(null)).toBe(-1)
    })

    test('should find the active chapter index in a list', () => {
      expect(currentChapterIndex([inactiveChapter, activeChapter])).toBe(1)
    })
  })

  describe('currentChapterByPlaytime()', () => {
    test('should be a function', () => {
      expect(typeof currentChapterByPlaytime).toBe('function')
    })

    test('hould find the active chapter by playtime', () => {
      expect(
        currentChapterByPlaytime([inactiveChapter, activeChapter, additionalChapter])(11)
      ).toEqual(inactiveChapter)
      expect(
        currentChapterByPlaytime([inactiveChapter, activeChapter, additionalChapter])(4000)
      ).toEqual(activeChapter)
      expect(
        currentChapterByPlaytime([activeChapter, additionalChapter, inactiveChapter])(3500)
      ).toEqual(inactiveChapter)
    })
  })
})
