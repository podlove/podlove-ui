import { toUpper, prop } from 'ramda'

export default async (type = ''):Promise<string> => {
  switch (toUpper(type)) {
    case 'XL':
      return await import(/* webpackChunkName: 'variant-xl' */ './variant-xl.html').then(
        prop('default')
      ) as string
    case 'L':
      return await import(/* webpackChunkName: 'variant-l' */ './variant-l.html').then(
        prop('default')
      ) as string
    case 'M':
      return await import(/* webpackChunkName: 'variant-m' */ './variant-m.html').then(
        prop('default')
      ) as string
    default:
      return null
  }
}
