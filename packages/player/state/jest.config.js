const base = require('../../../base.jest.config')

module.exports = Object.assign({}, base, {
  name: '@podlove/player-state',
  rootDir: '../../../',
  testMatch: ['*.test.js']
})
