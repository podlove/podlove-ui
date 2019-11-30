module.exports = () =>
  Promise.resolve({
    status: 200,
    headers: {
      get: () => ['application/json']
    },
    json() {
      return 'result'
    }
  })
