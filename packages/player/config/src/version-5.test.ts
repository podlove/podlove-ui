import { describe, expect, test } from 'vitest';

import {
  theme,
  reference,
  shareReference,
  originReference,
  episodeReference,
  configReference
} from './index.js';

const example = {
  version: 5,
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
    episode: 'http://foo.bar/episode-reference',
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
    tokens: {
      brand: '#E64415',
      brandDark: '#235973',
      brandDarkest: '#1A3A4A',
      brandLightest: '#E9F1F5',
      shadeDark: '#807E7C',
      shadeBase: '#807E7C',
      contrast: '#000',
      alt: '#fff'
    }
  }
};

describe('config version 5', () => {
  describe('theme()', () => {
    test('should be a function', () => {
      expect(typeof theme).toBe('function');
    });

    test('should extract the brand color', () => {
      expect(theme(example)).toEqual({
        tokens: {
          brand: '#E64415',
          brandDark: '#235973',
          brandDarkest: '#1A3A4A',
          brandLightest: '#E9F1F5',
          shadeDark: '#807E7C',
          shadeBase: '#807E7C',
          contrast: '#000',
          alt: '#fff'
        }
      });
    });
  });

  describe('reference', () => {
    test('should be a function', () => {
      expect(typeof reference).toBe('function');
    });

    test('should extract from the config', () => {
      expect(reference(example)).toEqual({
        share: 'http://foo.bar/share-reference',
        origin: 'http://foo.bar/origin-reference',
        config: 'http://foo.bar/config-reference',
        episode: 'http://foo.bar/episode-reference'
      });
    });

    test('should have a fallback', () => {
      expect(reference({})).toEqual({});
    });
  });

  describe('shareReference', () => {
    test('should be a function', () => {
      expect(typeof shareReference).toBe('function');
    });

    test('should extract from the config', () => {
      expect(shareReference(example)).toEqual('http://foo.bar/share-reference');
    });

    test('should have a fallback', () => {
      expect(shareReference({})).toEqual(null);
    });
  });

  describe('originReference', () => {
    test('should be a function', () => {
      expect(typeof originReference).toBe('function');
    });

    test('should extract from the config', () => {
      expect(originReference(example)).toEqual('http://foo.bar/origin-reference');
    });

    test('should have a fallback', () => {
      expect(originReference({})).toEqual(null);
    });
  });

  describe('episodeReference', () => {
    test('should be a function', () => {
      expect(typeof episodeReference).toBe('function');
    });

    test('should extract from the episode', () => {
      expect(episodeReference(example)).toEqual('http://foo.bar/episode-reference');
    });

    test('should have a fallback', () => {
      expect(episodeReference({})).toEqual(null);
    });
  });

  describe('configReference', () => {
    test('should be a function', () => {
      expect(typeof configReference).toBe('function');
    });

    test('should extract from the config', () => {
      expect(configReference(example)).toEqual('http://foo.bar/config-reference');
    });

    test('should have a fallback', () => {
      expect(configReference({})).toEqual(null);
    });
  });
});
