import { platform, os } from '../types'

const overcast = {
  title: 'Overcast',
  os: os.ios,
  patform: platform.app,
  scheme: feed => `overcast://${feed}`
}

const overcastWeb = {
  title: 'Overcast',
  os: os.osx,
  platform: platform.web,
  scheme: feed => `https://overcast.fm/${feed}`
}

export default [overcast, overcastWeb]
