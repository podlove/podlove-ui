const path = require('path')
const base = require('../../base.jest.config')

const defaults = path.resolve(__dirname, 'src/defaults.js')
const components = path.resolve(__dirname, 'src/components')

module.exports = Object.assign({}, base, {
  name: '@podlove/components',
  testMatch: ['**/*.test.js'],
  rootDir: '../../',
  moduleNameMapper: {
    defaults,
    'components/(.*)': path.join(components, '$1')
  }
})
