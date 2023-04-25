import { describe, test, expect } from 'vitest';
import { json, html } from './request';

const mockFetch = (status: number, header: string, result: any): Promise<Response> =>
  Promise.resolve({
    status,
    headers: {
      get: () => header
    },
    json: () => result,
    text: () => result,
  } as unknown as Response);

describe('request', () => {
  describe('json()', () => {
    test('should return null if the status is not 200', async () => {
      global.fetch = () => mockFetch(201, 'application/json', { foo: 'bar' });

      const result = await json('http://foo.bar');

      expect(result).toEqual(null);
    });

    test('should return null if the content type does not include "application/json"', async () => {
      global.fetch = () => mockFetch(200, 'text/html', '<html>result</html>');

      const result = await json('http://foo.bar');

      expect(result).toEqual(null);
    });

    test('should return the json response', async () => {
      global.fetch = () => mockFetch(200, 'application/json', { foo: 'bar' });

      const result = await json('http://foo.bar');

      expect(result).toEqual({ foo: 'bar' });
    });
  });

  describe('html()', () => {
    test('should return null if the status is not 200', async () => {
      global.fetch = () => mockFetch(201, 'text/html', '<html>result</html>');

      const result = await html('http://foo.bar');

      expect(result).toEqual(null);
    });

    test('should return null if the content type does not include "application/json"', async () => {
      global.fetch = () => mockFetch(200, 'application/json', '<html>result</html>');

      const result = await html('http://foo.bar');

      expect(result).toEqual(null);
    });

    test('should return the text response', async () => {
      global.fetch = () => mockFetch(200, 'text/html', '<html>result</html>');

      const result = await html('http://foo.bar');

      expect(result).toEqual('<html>result</html>');
    });
  });
});
