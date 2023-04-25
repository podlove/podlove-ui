import { describe, test, expect, vi } from 'vitest';
import throttle from './throttle'

describe('throttle()', () => {
  test('should throttle a function call', (done) => {
    const test = vi.fn()
    const throttled = throttle(test, 10)

    throttled()
    throttled()
    throttled()

    setTimeout(() => {
      expect(test).toBeCalledTimes(1)
      done()
    }, 10)
  })

  test('should call the function immediate if parameter is provided', (done) => {
    const test = vi.fn()
    const throttled = throttle(test, 10, true)

    throttled()
    throttled()
    throttled()
    setTimeout(() => {
      expect(test).toBeCalledTimes(2)
      done()
    }, 10)
  })
})
