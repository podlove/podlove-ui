import { Store } from 'redux';
import { init } from '@podlove/player-actions/init';
import { CONSTRUCTED } from '@podlove/player-actions/types';
import './main.js';
import createPlayer from './app.js';
import '../src/styles.css';
const container = document.getElementById('test');

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

(window as any).BOOTSTRAP_APP = (template = '', state = {}) => {
  if (!container) {
    return;
  }

  container.innerHTML = template;
  const { app, store } = createPlayer();

  app.mount(container);
  return initState(store, state);
};

(window as any).BOOTSTRAP_WEB_COMPONENT = async ({
  episode,
  config,
  variant,
  template,
  templateUrl
}) => {
  const elem = document.createElement('podlove-web-player');

  if (variant) {
    elem.setAttribute('variant', variant);
  }

  if (templateUrl) {
    elem.setAttribute('template', templateUrl);
  }

  if (template) {
    elem.innerHTML = template;
  }

  container.appendChild(elem);
  return await (elem as any).init(episode, config);
};
