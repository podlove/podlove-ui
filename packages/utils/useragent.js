export const getPlatform = () => {
  let platf = window.navigator.platform.toLowerCase()

  if (platf.match(/mac/i) !== null) {
    return 'osx'
  }

  if (platf.match(/(ipod|ipad|iphone)/i) !== null) {
    return 'ios'
  }

  if (platf.match(/android/i) !== null) {
    return 'android'
  }

  if (platf.match(/(linux|openbsd|freebsd|netbsd)/i) !== null) {
    return 'unix'
  }

  if (platf.match(/(windows|win)/i) !== null) {
    return 'windows'
  }
}
