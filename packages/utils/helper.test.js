import { inAnimationFrame, asyncAnimation, callWith } from './helper'

describe('helper', () => {
  beforeEach(() => {
    window.requestAnimationFrame = (cb) => cb()
  })

  describe('inAnimationFrame()', () => {
    test('it should be a function', () => {
      expect(typeof inAnimationFrame).toBe('function')
    })

    test(`calls a function on next animation frame`, () => {
      const testStub = jest.fn()

      inAnimationFrame(testStub)('foo', 'bar')
      expect(testStub).toHaveBeenCalledWith('foo', 'bar')
    })
  })

  describe('asyncAnimation()', () => {
    test('it should be a function', () => {
      expect(typeof asyncAnimation).toBe('function')
    })

    test(`returns a promise`, () => {
      const testStub = jest.fn()
      const result = asyncAnimation(testStub)('foo', 'bar')
      expect(typeof result.then).toBe('function')
    })

    test(`resolves stub in promise`, (done) => {
      const testStub = jest.fn()
      const result = asyncAnimation(testStub)('foo', 'bar')

      result.then(() => {
        expect(testStub).toHaveBeenCalledWith('foo', 'bar')
        done()
      })
    })
  })

  describe('callWith()', () => {
    test('it should be a function', () => {
      expect(typeof callWith).toBe('function')
    })

    test(`calls a function with given args`, () => {
      const testStub = jest.fn()

      callWith('foo', 'bar')(testStub)
      expect(testStub).toHaveBeenCalledWith('foo', 'bar')
    })
  })
})
