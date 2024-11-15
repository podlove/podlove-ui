# Button State

> Button Reducer and Selectors creating the state, created with [redux-actions](https://github.com/redux-utilities/redux-actions)

## Reducers

Each state slice provides a reducer function, that can be used to create the store:

```javascript
import { combineReducers } from 'redux'

import { reducer as runtime } from '@podlove/button-state/runtime'
import { reducer as theme } from '@podlove/button-state/theme'

export default combineReducers({
  runtime,
  theme
})
```

Depending on the application use case only a specific set of reducers can be used and arbitrary combined.

## Selectors

A selector is a function that provides access to a specific state property without the need to know the specific state structure:

```javascript
import { selectors as runtime } from '@podlove/player-state/runtime'
import { createSelector } from 'reselect';

import root from './root'

export default {
  language: createSelector(
    root.runtime,
    runtime.language
  ),
  platform: createSelector(
    root.runtime,
    runtime.platform
  )
}
```

Depending on the application use case and the state structure only a specific set of selectors are needed.
