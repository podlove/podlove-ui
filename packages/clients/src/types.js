export const type = {
  service: 'service',
  app: 'app'
}

export const platform = {
  android: 'android',
  ios: 'ios',
  osx: 'osx',
  windows: 'windows',
  unix: 'unix',
  web: 'web',
  custom: 'custom'
}

export const client = ({
  title = null,
  scheme = () => null,
  icon = null,
  install = null,
  type = null,
  platform = null
} = {}) => ({
  title,
  scheme,
  icon,
  install,
  type,
  platform
})
