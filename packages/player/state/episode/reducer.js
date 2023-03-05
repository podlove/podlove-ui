import { compose, propOr } from 'ramda'
import { handleActions } from 'redux-actions'

import { parseDate } from '@podlove/utils/time'
import { sanitize } from '@podlove/utils/dom'
import { createObject } from '@podlove/utils/helper'
import { READY } from '@podlove/player-actions/types'

export const INIT_STATE = {
  title: null,
  subtitle: null,
  summary: null,
  poster: null,
  link: null,
  publicationDate: null
}

const update = createObject({
  title: propOr(null, 'title'),
  subtitle: propOr(null, 'subtitle'),
  summary: compose(sanitize, propOr(null, 'summary')),
  link: propOr(null, 'link'),
  poster: propOr(null, 'poster'),
  publicationDate: compose(parseDate, propOr(null, 'publicationDate'))
})

export const reducer = handleActions(
  {
    [READY]: (state, { payload }) => ({
      ...state,
      ...update(payload)
    })
  },
  INIT_STATE
)
