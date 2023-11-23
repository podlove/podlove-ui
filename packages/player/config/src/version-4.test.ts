import { describe, expect, test } from 'vitest';

import {
  duration,
  playtime,
  media,
  chapters,
  reference,
  theme,
  files,
  validate,
  transcripts,
  shareReference,
  originReference,
  episodeReference,
  configReference
} from './index'

const example = {
  duration: '00:10:00',
  playtime: '00:10:00',
  audio: [
    {
      url: 'http://foo.bar',
      size: 1337,
      title: 'file title',
      mimeType: 'mpg3/audio'
    },
    {}
  ],
  files: [
    {
      url: 'http://foo.baz',
      size: 1338,
      title: 'file title',
      mimeType: 'mpg4/video'
    },
    {
      url: 'http://foo.bar',
      size: 1337,
      title: 'file title',
      mimeType: 'mpg3/audio'
    }
  ],
  chapters: [
    {
      title: 'chapter 1',
      start: '00:00:00',
      href: 'http://foo.bar/some-topic',
      image: 'http://foo.bar/some-image.png'
    }
  ],
  reference: {
    share: 'http://foo.bar/share-reference',
    origin: 'http://foo.bar/origin-reference',
    config: 'http://foo.bar/config-reference'
  },
  transcripts: [
    {
      text: 'foo',
      start: '00:00',
      end: '00:10'
    },
    {
      text: 'foo',
      start: '00:10',
      end: '00:20'
    }
  ],
  theme: {
    main: '#a00',
    highlight: '#0a0'
  }
}

describe('config version 4', () => {
  describe('duration', () => {
    test('should be a function', () => {
      expect(typeof duration).toBe('function')
    })

    test('should extract from the config', () => {
      expect(duration(example)).toBe(600000)
    })

    test('should have a fallback', () => {
      expect(duration({})).toBe(0)
    })
  })

  describe('playtime', () => {
    test('should be a function', () => {
      expect(typeof playtime).toBe('function')
    })

    test('should extract from the config', () => {
      expect(playtime(example)).toBe(600000)
    })

    test('should have a fallback', () => {
      expect(playtime({})).toBe(0)
    })
  })

  describe('media', () => {
    test('should be a function', () => {
      expect(typeof media).toBe('function')
    })

    test('should extract from the config', () => {
      expect(media(example)).toEqual([
        {
          url: 'http://foo.bar',
          size: 1337,
          title: 'file title',
          mimeType: 'mpg3/audio'
        },
        {
          url: null,
          size: 0,
          title: null,
          mimeType: null
        }
      ])
    })

    test('should have a fallback', () => {
      expect(media({})).toEqual([])
    })
  })

  describe('chapters', () => {
    test('should be a function', () => {
      expect(typeof chapters).toBe('function')
    })

    test('should extract from the config', () => {
      expect(chapters(example)).toEqual([
        {
          title: 'chapter 1',
          start: '00:00:00',
          href: 'http://foo.bar/some-topic',
          image: 'http://foo.bar/some-image.png'
        }
      ])
    })

    test('should have a fallback', () => {
      expect(chapters({})).toEqual([])
    })
  })

  describe('reference', () => {
    test('should be a function', () => {
      expect(typeof reference).toBe('function')
    })

    test('should extract from the config', () => {
      expect(reference(example)).toEqual({
        share: 'http://foo.bar/share-reference',
        origin: 'http://foo.bar/origin-reference',
        config: 'http://foo.bar/config-reference'
      })
    })

    test('should have a fallback', () => {
      expect(reference({})).toEqual({})
    })
  })

  describe('shareReference', () => {
    test('should be a function', () => {
      expect(typeof shareReference).toBe('function')
    })

    test('should extract from the config', () => {
      expect(shareReference(example)).toEqual('http://foo.bar/share-reference')
    })

    test('should have a fallback', () => {
      expect(shareReference({})).toEqual(null)
    })
  })

  describe('originReference', () => {
    test('should be a function', () => {
      expect(typeof originReference).toBe('function')
    })

    test('should extract from the config', () => {
      expect(originReference(example)).toEqual('http://foo.bar/origin-reference')
    })

    test('should have a fallback', () => {
      expect(originReference({})).toEqual(null)
    })
  })

  describe('episodeReference', () => {
    test('should be a function', () => {
      expect(typeof episodeReference).toBe('function')
    })

    test('should extract from the episode', () => {
      expect(episodeReference(example)).toEqual('http://foo.bar/config-reference')
    })

    test('should have a fallback', () => {
      expect(episodeReference({})).toEqual(null)
    })
  })

  describe('configReference', () => {
    test('should be a function', () => {
      expect(typeof configReference).toBe('function')
    })

    test('should extract from the config', () => {
      expect(configReference(example)).toEqual(null)
    })

    test('should have a fallback', () => {
      expect(configReference({})).toEqual(null)
    })
  })

  describe('transcripts()', () => {
    test('should be a function', () => {
      expect(typeof transcripts).toBe('function')
    })

    test('should extract the transcripts', () => {
      expect(transcripts(example)).toEqual([
        {
          text: 'foo',
          start: '00:00',
          end: '00:10'
        },
        {
          text: 'foo',
          start: '00:10',
          end: '00:20'
        }
      ])
    })

    test('should have a fallback', () => {
      expect(transcripts({})).toEqual([])
    })
  })

  describe('theme()', () => {
    test('should be a function', () => {
      expect(typeof theme).toBe('function')
    })

    test('should extract the brand color', () => {
      expect(theme(example)).toEqual({
        tokens: {
          brand: '#a00'
        },
        fonts: {}
      })
    })

    test('should have a fallback', () => {
      expect(theme({})).toEqual({
        tokens: {},
        fonts: {}
      })
    })
  })

  describe('files', () => {
    test('should be a function', () => {
      expect(typeof files).toBe('function')
    })

    test('should extract the media files', () => {
      expect(files(example)).toEqual([
        {
          url: 'http://foo.baz',
          size: 1338,
          title: 'file title',
          mimeType: 'mpg4/video'
        },
        {
          url: 'http://foo.bar',
          size: 1337,
          title: 'file title',
          mimeType: 'mpg3/audio'
        }
      ])
    })

    test('should have a fallback', () => {
      expect(files({})).toEqual([])
    })
  })

  describe('validate', () => {
    test('should be a function', () => {
      expect(typeof files).toBe('function')
    })

    test('should return true on vaild config', () => {
      expect(validate(example)).toBe(true)
    })

    test('should return false by default', () => {
      expect(validate({})).toBe(false)
    })
  })
})
