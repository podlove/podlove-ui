const base = require('../../../base.jest.config')

module.exports = Object.assign({}, base, {
  name: '@podlove/player-sagas',
  rootDir: '../../../',
  testMatch: ['*.test.js']
})
