import { toHumanTime } from '@podlove/utils/time'

export default Vue => {
  Vue.filter('toHumanTime', toHumanTime)
}
