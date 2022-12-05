global.__unfetch__ = {
  status: 200,
  header: 'application/json',
  json: { json: 'result' },
  html: '<html>result</html>'
}

module.exports = () =>
  Promise.resolve({
    status: global.__unfetch__.status,
    headers: {
      get: () => [global.__unfetch__.header]
    },
    json() {
      return global.__unfetch__.json
    },
    text() {
      return global.__unfetch__.html
    }
  })
