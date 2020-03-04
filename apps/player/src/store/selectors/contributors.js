import { compose, pathOr, values } from 'ramda'
import { selectors } from '@podlove/player-state/contributors'

import root from './root'

const list = compose(selectors.contributors, root.contributors)

const groups = state => {
  const contributors = list(state)

  return values(
    contributors.reduce((result, contributor) => {
      const group = contributor.group
      const existing = pathOr([], [group.id, 'contributors'], result)

      return {
        ...result,
        [group.id]: {
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
