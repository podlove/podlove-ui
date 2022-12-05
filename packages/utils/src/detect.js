const detectMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

let isMobile = null

if (typeof window !== 'undefined') {
  isMobile = detectMobile()
}

export { isMobile }
