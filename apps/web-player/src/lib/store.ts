import { State } from '@podlove/player-state/lifecycle';
import { curry } from 'ramda';
import { Store } from 'redux';

const onLifecycle = curry(
  (event: string, store: Store) =>
    new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const { lifecycle }: { lifecycle: State } = store.getState();
        if (lifecycle !== event) {
          return;
        }

        unsubscribe();
        resolve(store);
      });

      store.dispatch({ type: 'PLUGIN_CONNECT' });
    })
);

export const ready = onLifecycle('ready') as (store: Store) => Promise<Store>;
export const constructed = onLifecycle('constructed') as (store: Store) => Promise<Store>;
