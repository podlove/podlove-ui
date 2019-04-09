import {
  duration,
  playtime,
  media,
  chapters,
  reference,
  transcripts,
  shareReference,
  originReference,
  configReference
} from './config'

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
  ]
}

describe('config', () => {
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

  describe('configReference', () => {
    test('should be a function', () => {
      expect(typeof configReference).toBe('function')
    })

    test('should extract from the config', () => {
      expect(configReference(example)).toEqual('http://foo.bar/config-reference')
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

    test('should extract the transcripts', () => {
      expect(transcripts({})).toEqual([])
    })
  })
})
