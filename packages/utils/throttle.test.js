import throttle from './throttle'

describe('throttle()', () => {
  it('should throttle a function call', (done) => {
    const test = jest.fn()
    const throttled = throttle(test, 10)

    throttled()
    throttled()
    throttled()

    setTimeout(() => {
      expect(test).toBeCalledTimes(1)
      done()
    }, 10)
  })

  it('should call the function immediate if parameter is provided', (done) => {
    const test = jest.fn()
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
