
const devServer = require('./dev-server')
const output = require('./output')
const rules = require('./rules')
const plugins = require('./plugins')
const resolve = require('./resolve')
const optimization = require('./optimization')

module.exports = {
  devServer,
  output,
  rules,
  plugins,
  resolve,
  optimization
}
