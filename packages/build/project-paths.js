const path = require('path')

const root = path.resolve(__dirname, '..', '..')

module.exports = {
  root,
  apps: {
    player: path.resolve(root, 'apps', 'player', 'dist'),
    subscribeButton: path.resolve(root, 'apps', 'subscribe-button', 'dist')
  },
  packages: {
    components: path.resolve(root, 'packages', 'components', 'src', 'components'),
    clients: path.resolve(root, 'packages', 'clients', 'src')
  }
}
