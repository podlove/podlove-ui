import { json, html } from './request'

describe('request', () => {
  describe('json()', () => {
    it('should return null if the status is not 200', async () => {
      global.__unfetch__ = {
        status: 201,
        header: 'application/json',
        json: 'result',
        html: '<html>result</html>'
      }

      const result = await json('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return null if the content type does not include "application/json"', async () => {
      global.__unfetch__ = {
        status: 200,
        header: 'text/html',
        json: 'result',
        html: '<html>result</html>'
      }

      const result = await json('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return the json response', async () => {
      global.__unfetch__ = {
        status: 200,
        header: 'application/json',
        json: { foo: 'bar' },
        html: '<html>result</html>'
      }

      const result = await json('http://foo.bar')

      expect(result).toEqual({ foo: 'bar' })
    })
  })

  describe('html()', () => {
    it('should return null if the status is not 200', async () => {
      global.__unfetch__ = {
        status: 201,
        header: 'text/html',
        json: 'result',
        html: '<html>result</html>'
      }

      const result = await html('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return null if the content type does not include "application/json"', async () => {
      global.__unfetch__ = {
        status: 200,
        header: 'application/json',
        json: 'result',
        html: '<html>result</html>'
      }

      const result = await html('http://foo.bar')

      expect(result).toEqual(null)
    })

    it('should return the text response', async () => {
      global.__unfetch__ = {
        status: 200,
        header: 'text/html',
        json: 'result',
        html: 'foo bar'
      }

      const result = await html('http://foo.bar')

      expect(result).toEqual('foo bar')
    })
  })
})
