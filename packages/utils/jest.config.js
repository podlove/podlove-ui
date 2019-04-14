const base = require('../../base.jest.config')

module.exports = Object.assign({}, base, {
  name: '@podlove/utils',
  rootDir: '../../',
  testMatch: ['*.test.js']
})
