const detectMobile = (): boolean =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

let isMobile: boolean | null = null

if (typeof window !== 'undefined') {
  isMobile = detectMobile()
}

export { isMobile }
