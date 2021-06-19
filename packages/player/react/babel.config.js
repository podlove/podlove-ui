const base = require('../../../babel.config')

module.exports = {
  ...base,
  presets: [...base.presets, '@babel/preset-react'],
  plugins: [...base.plugins, '@babel/plugin-proposal-class-properties']
}
