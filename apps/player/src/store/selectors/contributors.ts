import { get } from 'lodash-es';
import { selectors } from '@podlove/player-state/contributors';
import { createSelector } from 'reselect';

import root from './root.js';
import State from '../state.js';

const list = createSelector(root.contributors, selectors.contributors);

const groups = (state: State) => {
  const contributors = list(state).reduce((result, contributor) => {
    const group = get(contributor, 'group');
    const id = get(group, 'id');
    const existing = get(result, [id, 'contributors'], [])

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
  }, {});

  return Object.values(contributors);
};

export default {
  list,
  groups
};
