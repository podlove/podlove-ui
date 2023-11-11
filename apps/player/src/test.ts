import { Store } from 'redux';
import { init } from '@podlove/player-actions/init';
import { CONSTRUCTED } from '@podlove/player-actions/types';
import createPlayer from './main.js';
import '../src/styles.css';

const initState = (store: Store, state: any) =>
  new Promise((resolve) => {
    const subscription = store.subscribe(() => {
      const state = store.getState();

      if (state.lastAction.type === CONSTRUCTED) {
        resolve(store);
      }
    });

    store.dispatch(init(state));
    resolve(store);
    subscription();
  });

(window as any).BOOTSTRAP = (template = '', state = {}) => {
  const container = document.getElementById('app');

  if (!container) {
    return;
  }

  container.innerHTML = template;
  const { app, store } = createPlayer();

  app.mount(container);
  return initState(store, state);
};
