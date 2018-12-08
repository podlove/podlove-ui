import * as runtime from '@podlove/actions/runtime'
import * as init from '@podlove/actions/init'
import * as error from '@podlove/actions/error'

export default {
  ...runtime,
  ...init,
  ...error
}
