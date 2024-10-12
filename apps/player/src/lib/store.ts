import { State as LifeCycleState } from '@podlove/player-state/lifecycle';
import { Store } from 'redux';
import State from '../store/state.js';

const onLifecycle =
  (event: string) => (store: Store<State>) =>
    new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const { lifecycle }: { lifecycle: LifeCycleState } = store.getState();

        if (lifecycle !== event) {
          return;
        }

        unsubscribe();
        resolve(store);
      });

      store.dispatch({ type: 'PLUGIN_CONNECT' });
    })

export const ready = onLifecycle('ready') as (store: Store) => Promise<Store>;
export const constructed = onLifecycle('constructed') as (store: Store) => Promise<Store>;
