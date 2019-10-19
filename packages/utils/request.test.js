import { json, html } from './request'

describe('request', () => {
  describe('json()', () => {
    it('should return null if the status is not 200', async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 201
        })
      )

      const result = await json('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return null if the content type does not include "application/json"', async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          headers: {
            get: () => ['text/html']
          }
        })
      )

      const result = await json('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return the json response', async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          headers: {
            get: () => ['application/json']
          },
          json() {
            return { foo: 'bar' }
          }
        })
      )

      const result = await json('http://foo.bar')

      expect(result).toEqual({ foo: 'bar' })
    })
  })

  describe('html()', () => {
    it('should return null if the status is not 200', async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 201
        })
      )

      const result = await html('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return null if the content type does not include "application/json"', async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          headers: {
            get: () => ['application/json']
          }
        })
      )

      const result = await html('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return the text response', async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          headers: {
            get: () => ['text/html']
          },
          text() {
            return 'foo bar'
          }
        })
      )

      const result = await html('http://foo.bar')

      expect(result).toEqual('foo bar')
    })
  })
})
