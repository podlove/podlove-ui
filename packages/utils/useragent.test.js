import { getPlatform } from './useragent'

const platforms = {
  osx: ['MacIntel', 'Macintosh', 'MacPPC', 'Mac68K'],
  ios: ['iPhone', 'iPod', 'iPad', 'iPhone Simulator', 'iPod Simulator', 'iPad Simulator'],
  android: ['Android', 'Linux Android'],
  unix: ['FreeBSD', 'Linux aarch64', 'Linux i686 X11', 'OpenBSD amd64'],
  windows: ['Windows', 'Win32', 'Win64', 'Windows8.1']
}

platforms.osx.forEach(el => {
  describe('Test getPlatform on osx', () => {
    beforeEach(() => {
      Object.defineProperty(window.navigator, 'platform', {
        writable: true,
        value: el
      })
    })
    test('it should be osx', () => {
      expect(getPlatform()).toEqual('osx')
    })
  })
})

platforms.ios.forEach(el => {
  describe('Test getPlatform on ios', () => {
    beforeEach(() => {
      Object.defineProperty(window.navigator, 'platform', {
        writable: true,
        value: el
      })
    })
    test('it should be ios', () => {
      expect(getPlatform()).toEqual('ios')
    })
  })
})
platforms.android.forEach(el => {
  describe('Test getPlatform on android', () => {
    beforeEach(() => {
      Object.defineProperty(window.navigator, 'platform', {
        writable: true,
        value: el
      })
    })
    test('it should be android', () => {
      expect(getPlatform()).toEqual('android')
    })
  })
})
platforms.unix.forEach(el => {
  describe('Test getPlatform on unix', () => {
    beforeEach(() => {
      Object.defineProperty(window.navigator, 'platform', {
        writable: true,
        value: el
      })
    })
    test('it should be unix', () => {
      expect(getPlatform()).toEqual('unix')
    })
  })
})
platforms.windows.forEach(el => {
  describe('Test getPlatform on windows', () => {
    beforeEach(() => {
      Object.defineProperty(window.navigator, 'platform', {
        writable: true,
        value: el
      })
    })
    test('it should be windows', () => {
      expect(getPlatform()).toEqual('windows')
    })
  })
})
