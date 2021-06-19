const path = require('path')

const resolveAlias = (alias = {}) =>
  Object.keys(alias).reduce(
    (results, key) =>
      Object.assign({}, results, {
        [key]: path.resolve(alias[key])
      }),
    {}
  )

module.exports = (alias = {}) => ({
  extensions: ['*', '.js', '.vue', '.json', '.jsx'],
  alias: resolveAlias(alias)
})
