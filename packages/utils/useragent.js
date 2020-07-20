import MobileDetect from 'mobile-detect'

export const getPlatform = () => {
  const device = new MobileDetect(window.navigator.userAgent)

  if (device.match('ipod|ipad|iphone')) {
    return 'ios'
  }

  if (device.match('android')) {
    return 'android'
  }

  if (device.match('mac')) {
    return 'osx'
  }

  if (device.match('linux|openbsd|freebsd|netbsd')) {
    return 'unix'
  }

  if (device.match('windows|win')) {
    return 'windows'
  }
}
