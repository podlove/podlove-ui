import { compose, propOr } from 'ramda'
import { handleActions } from 'redux-actions'

import { parseDate } from '@podlove/utils/time'
import { sanitize } from '@podlove/utils/dom'
import { createObject } from '@podlove/utils/helper'
import { INIT } from '@podlove/actions/types'

export const INIT_STATE = {
  title: null,
  subtitle: null,
  summary: null,
  poster: null,
  link: null,
  publicationDate: null
}

const change = createObject({
  title: propOr(null, 'title'),
  subtitle: propOr(null, 'subtitle'),
  summary: compose(sanitize, propOr(null, 'summary')),
  link: propOr(null, 'link'),
  poster: propOr(null, 'poster'),
  publicationDate: compose(parseDate, propOr(null, 'publicationDate'))
})

export const reducer = handleActions({
  [INIT]: (state, { payload }) => ({
    ...state,
    ...change(payload)
  })
}, INIT_STATE)
