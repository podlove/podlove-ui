import path from 'path'

export default {
  '@podlove/subscribe-button': path.resolve(__dirname, '../packages/subscribe-button/src'),
  '@podlove/player': path.resolve(__dirname, '../packages/player/src'),

  '@podlove/clients': path.resolve(__dirname, '../packages/clients/src'),
  '@podlove/utils': path.resolve(__dirname, '../packages/utils/src'),
  '@podlove/components': path.resolve(__dirname, '../packages/components/src/components'),

  '@podlove/button-actions': path.resolve(__dirname, '../packages/button/actions'),
  '@podlove/button-config': path.resolve(__dirname, '../packages/button/config'),
  '@podlove/button-react': path.resolve(__dirname, '../packages/button/react/src'),
  '@podlove/button-state': path.resolve(__dirname, '../packages/button/state'),

  '@podlove/player-actions': path.resolve(__dirname, '../packages/player/actions'),
  '@podlove/player-config': path.resolve(__dirname, '../packages/player/config'),
  '@podlove/player-sagas': path.resolve(__dirname, '../packages/player/sagas'),
  '@podlove/player-state': path.resolve(__dirname, '../packages/player/state'),
}
