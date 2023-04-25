import { describe, test, expect } from 'vitest';
import { hostname, pathname, addQueryParameter } from './url'

describe('url', () => {
  describe('hostname()', () => {
    test('should extract the hostname from an url', () => {
      expect(hostname('http://bar.foo.bar')).toEqual('bar.foo.bar')
      expect(hostname('https://baz.foo.bar')).toEqual('baz.foo.bar')
    })

    test('should remove www from an url', () => {
      expect(hostname('https://www.foo.bar')).toEqual('foo.bar')
    })

    test('should tolerate invalid domains', () => {
      expect(hostname('not an url')).toEqual('')
    })
  })

  describe('pathname()', () => {
    test('should extract the path from an url', () => {
      expect(pathname('http://bar.foo.bar/my-path')).toEqual('/my-path')
    })

    test('should remove the right slash from url', () => {
      expect(pathname('http://bar.foo.bar/my-path/')).toEqual('/my-path')
    })
  })

  describe('addQueryParameter()', () => {
    test('should have a default for query parameter', () => {
      expect(addQueryParameter('http://bar.foo.bar/my-path')).toEqual('http://bar.foo.bar/my-path')
    })

    test('should add a query parameter to an url', () => {
      expect(addQueryParameter('http://bar.foo.bar/my-path', { x: 'foo', y: 'bar' })).toEqual(
        'http://bar.foo.bar/my-path?x=foo&y=bar'
      )
    })

    test('should ammend to existing query parameters', () => {
      expect(addQueryParameter('http://bar.foo.bar/my-path?x=foo&y=bar', { z: 'baz' })).toEqual(
        'http://bar.foo.bar/my-path?x=foo&y=bar&z=baz'
      )
    })
  })
})
