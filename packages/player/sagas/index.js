import createSagaMiddleware from 'redux-saga'

const middleware = createSagaMiddleware()
const run = (...sagas) => {
  sagas.forEach(saga => middleware.run(saga))
}

export default {
  middleware,
  run
}
