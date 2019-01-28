import MobileDetect from 'mobile-detect'

const detect = new MobileDetect(window.navigator.userAgent)

export const isMobile = detect.mobile() || detect.tablet()
