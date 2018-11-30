
const devServer = require('./dev-server')
const output = require('./output')
const rules = require('./rules')
const plugins = require('./plugins')
const resolve = require('./resolve')

module.exports = {
  devServer,
  output,
  rules,
  plugins,
  resolve
}
