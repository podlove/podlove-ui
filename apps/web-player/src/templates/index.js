import { toUpper, prop } from 'ramda'

export default async (type = '') => {
  switch (toUpper(type)) {
    case 'XL':
      return await import('./variant-xl.html').then(prop('default'))
    case 'L':
      return await import('./variant-l.html').then(prop('default'))
    case 'M':
      return await import('./variant-m.html').then(prop('default'))
    default:
      return null
  }
}
