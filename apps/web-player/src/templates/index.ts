import { toUpper, prop } from 'ramda'

export default async (type = '') => {
  switch (toUpper(type)) {
    case 'XL':
      return await import('./variant-xl.html?raw').then(
        prop('default')
      )
    case 'L':
      return await import('./variant-l.html?raw').then(
        prop('default')
      )
    case 'M':
      return await import('./variant-m.html?raw').then(
        prop('default')
      )
    default:
      return null
  }
}
