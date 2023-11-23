import { pathOr, values, prop } from 'ramda';
import { selectors } from '@podlove/player-state/contributors';
import { createSelector } from 'reselect';

import root from './root.js';
import State from '../state.js';

const list = createSelector(root.contributors, selectors.contributors);

const groups = (state: State) => {
  const contributors = list(state);

  return values(
    contributors.reduce((result, contributor) => {
      const group = prop('group', contributor);
      const existing = pathOr([], [prop('id', group), 'contributors'], result);
      const id = prop('id', group);

      if (!group) {
        return result;
      }

      return {
        ...result,
        [id]: {
          ...group,
          contributors: [...existing, contributor]
        }
      };
    }, {})
  );
};

export default {
  list,
  groups
};
