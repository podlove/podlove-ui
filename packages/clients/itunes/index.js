import { os, platform } from '../types'

const itunes = {
  title: 'Itunes',
  os: os.osx,
  scheme: `itunes://store`,
  platform: platform.app
}

export default [itunes]
