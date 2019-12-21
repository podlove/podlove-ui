const path = require('path')
const base = require('../../../base.jest.config')

module.exports = Object.assign({}, base, {
  name: '@podlove/button-state',
  rootDir: '../../../',
  testMatch: [path.join(__dirname, '**', '*.test.js')]
})
