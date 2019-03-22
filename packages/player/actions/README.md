# Player Actions

> Player API/Events that establish side effects and state changes based on [redux-actions](https://github.com/redux-utilities/redux-actions)

```javascript
{
  type: 'SET_PLAYTIME',
  payload: 102020
}
```

## Types

All Player action tyoes are defined within `@podlove/player-action/types` which is the foundation for all actions.

## Actions

Export helper function for different player use cases like chapters, theme, errors and lifecycle. Each exported function will produce a specific action passing the arguments to the payload.
