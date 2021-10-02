const path = require('path')

const root = path.resolve(__dirname, '..', '..')

module.exports = {
  root,
  packages: {
    components: path.resolve(root, 'packages', 'components', 'src', 'components'),
    clients: path.resolve(root, 'packages', 'clients', 'src')
  }
}
