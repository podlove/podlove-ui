export const getPlattform = () => {
  let platf = window.navigator.platform.toLowerCase()
  // console.log(platf)

  if (platf.match(/mac/i) !== null) {
    return 'osx'
  }

  if (platf.match(/(ipod|ipad|iphone)/i) !== null) {
    return 'ios'
  }
}
