import { compose, pathOr, values, prop } from 'ramda'
import { selectors } from '@podlove/player-state/contributors'

import root from './root'

const list = compose(selectors.contributors, root.contributors)

const groups = state => {
  const contributors = list(state)

  return values(
    contributors.reduce((result, contributor) => {
      const group = prop('group', contributor)
      const existing = pathOr([], [prop('id', group), 'contributors'], result)
      const id = prop('id', group)

      if (!group) {
        return result
      }

      return {
        ...result,
        [id]: {
          ...group,
          contributors: [...existing, contributor]
        }
      }
    }, {})
  )
}

export default {
  list,
  groups
}
