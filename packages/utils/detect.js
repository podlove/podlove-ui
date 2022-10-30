import MobileDetect from 'mobile-detect'

let isMobile = null

if (typeof window !== 'undefined') {
  detect = new MobileDetect(window.navigator.userAgent)
  isMobile = detect.mobile() || detect.tablet()
}

export { isMobile }
