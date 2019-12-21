import { toUpper, prop } from 'ramda'

export default async (type = '') => {
  switch (toUpper(type)) {
    case 'XL':
      return await import(/* webpackChunkName: 'variant-xl' */ './variant-xl.html').then(
        prop('default')
      )
    case 'L':
      return await import(/* webpackChunkName: 'variant-l' */ './variant-l.html').then(
        prop('default')
      )
    case 'M':
      return await import(/* webpackChunkName: 'variant-m' */ './variant-m.html').then(
        prop('default')
      )
    default:
      return null
  }
}
