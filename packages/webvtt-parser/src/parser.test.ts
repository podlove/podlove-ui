import { describe, it, expect } from 'vitest';
import parse from './parser.js';

const emptyResult = {
  cues: []
};

describe('webvtt', () => {
  it('should return an empty result', () => {
    const input = 'WEBVTT\n\n';

    expect(parse(input)).toEqual(emptyResult);
  });

  it('should allow various line terminators', () => {
    const inputs = [
      'WEBVTT\u{000D}\u{000A}\u{000D}\u{000A}',
      'WEBVTT\u{000A}\u{000A}',
      'WEBVTT\u{000D}\u{000D}'
    ];

    inputs.forEach((input) => {
      expect(parse(input)).toEqual(emptyResult);
    });
  });

  describe('ignored content', () => {
    it('should ignore BOM', () => {
      const input = `${String.fromCharCode(239, 187, 191)}WEBVTT\n\n`;
      expect(parse(input)).toEqual(emptyResult);
    });

    it('should ignore content after signature', () => {
      const input = `WEBVTT bla bla\n\n`;
      expect(parse(input)).toEqual(emptyResult);
    });

    it('should ignore notes', () => {
      const content = `WEBVTT\n\nNOTE this is a note\n\n00:00:00.000 --> 01:22:33.440
Hello world\n`;
      expect(parse(content)).toEqual({
        cues: [
          {
            text: 'Hello world',
            start: 0,
            end: 4953.44
          }
        ]
      });
    });

    it('should ignore multiple notes', () => {
      const content = `WEBVTT\n\nNOTE\nthis is a\nmultiline\nnote\n\n00:00:00.000 --> 01:22:33.440
Hello world\n`;
      expect(parse(content)).toEqual({
        cues: [
          {
            text: 'Hello world',
            start: 0,
            end: 4953.44
          }
        ]
      });
    });
  });

  describe('simple cue', () => {
    const tests = [
      {
        input: `WEBVTT\n\n00:00:00.000 --> 01:22:33.440
Hello world\n`,
        title: 'default input'
      },
      {
        input: `WEBVTT\n\n00:00:00.000 --> 01:22:33.440
Hello world`,
        title: 'without trainling newlines'
      },
      {
        input: `WEBVTT\n\n00:00:00.000 --> 01:22:33.440
Hello world`,
        title: 'with trainling newlines'
      }
    ];

    const expected = {
      cues: [
        {
          text: 'Hello world',
          start: 0,
          end: 4953.44
        }
      ]
    };

    tests.forEach((test) => {
      it(`should parse ${test.title}`, () => {
        expect(parse(test.input)).toEqual(expected);
      });
    });
  });

  describe('cue with voice', () => {
    const tests = [
      {
        input: `WEBVTT\n\n00:00:00.000 --> 01:22:33.440
<v Eric Teubert>Hello world\n`,
        title: `cue with voice`
      },
      {
        input: `WEBVTT\n\n00:00:00.000 --> 01:22:33.440
<v Eric Teubert>Hello world</v>\n`,
        title: 'cue with voice and closing voice'
      },
      {
        input: `WEBVTT\n\n00:00:00.000 --> 01:22:33.440
<v.somestyle Eric Teubert>Hello world\n`,
        title: 'cue with classy voice'
      }
    ];

    const expected = {
      cues: [
        {
          voice: 'Eric Teubert',
          text: 'Hello world',
          start: 0,
          end: 4953.44
        }
      ]
    };

    tests.forEach((test) => {
      it(`should parse ${test.title}`, () => {
        expect(parse(test.input)).toEqual(expected);
      });
    });
  });

  describe('cue with identifiers', () => {
    it('should parse cue with identifier', () => {
      const content = `WEBVTT\n\nintro\n00:00:00.000 --> 01:22:33.440
Hello world\n`;

      expect(parse(content)).toEqual({
        cues: [
          {
            identifier: 'intro',
            text: 'Hello world',
            start: 0,
            end: 4953.44
          }
        ]
      });
    });
  });

  describe('multiple cues', () => {
    it('should parse multiple cues', () => {
      const content = `WEBVTT\n\n00:00:00.000 --> 01:22:33.440
Hello world\n\n01:22:33.440 --> 01:22:34.440
Hi again\n`;

      expect(parse(content)).toEqual({
        cues: [
          {
            text: 'Hello world',
            start: 0,
            end: 4953.44
          },
          {
            text: 'Hi again',
            start: 4953.44,
            end: 4954.44
          }
        ]
      });
    });
  });

  describe('exceptions', () => {
    it('should throw exception on missing WEBVTT', () => {
      expect(() => parse('')).toThrow('Missing WEBVTT at beginning of file');
    });

    it('should throw exception on missing line terminator', () => {
      expect(() => parse('WEBVTT')).toThrow('Expected "line terminator"');
    });

    it('should throw an exception for missing cue timings', () => {
      const content = `WEBVTT\n\n00:09:43.101 --> 00:09:45.800
<v andreasbogk>foo.,

[00:09:45-8 @timpritlove] bar.
n
00:09:56.601 --> 00:10:05.400
<v andreasbogk>baz.

00:10:05.401 --> 00:10:14.200
<v andreasbogk>hey
`;

      expect(() => parse(content)).toThrow('missing cue timings at line 8');
    });

    // TODO: this is a PHP error not sure if that handling is usefull here
    it.skip('should throw an exception if an invalid character is found', () => {
      const content = `WEBVTT\n\n00:09:43.101 --> 00:09:45.800
Hello & world
`;

      expect(() => parse(content)).toThrow('invalid character at line 5');
    });

    it('should throw an exception if a cue identifier is standalone', () => {
      const content = `WEBVTT

00:11.000 --> 00:13.000
<v Roger Bingham>We are in New York City

[01:45:07-2 Outro]
`;


      expect(() => parse(content)).toThrow('Cue identifier cannot be standalone');
    });
  });
});
