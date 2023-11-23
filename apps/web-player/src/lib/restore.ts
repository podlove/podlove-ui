import { PodloveWebPlayerConfig, PodloveWebPlayerTab } from '@podlove/types';
import { Store } from 'redux';

import debounce from 'debounce';
import { selectors } from '@podlove/player-state/timepiece';
import { backendPlaytime, requestPlaytime } from '@podlove/player-actions/timepiece';
import { restore } from '@podlove/player-actions/lifecycle';
import { showPauseButton } from '@podlove/player-actions/components';
import { loadQuantiles } from '@podlove/player-actions/quantiles';
import { toggleTab } from '@podlove/player-actions/tabs';
import { compose, propOr, curry, path, isEmpty } from 'ramda';
import LocalStorage from '@podlove/utils/localstorage';
import { hashCode } from 'hashcode';
import { activeTab as getActiveTab, sharePlaytime } from '@podlove/player-config';
import { hideSharePlaytime, showSharePlaytime } from '@podlove/player-actions/visible-components';
import { urlParameters } from '@podlove/utils/location';
import { requestPause, requestPlay } from '@podlove/player-actions/play';

import { ready } from './store.js';

const selectPlaytime = compose(selectors.playtime, propOr({}, 'timepiece'));

const selectQuantiles = propOr([], 'quantiles');

const selectTabs = propOr({}, 'tabs');

const recordState = curry((key: string, storage: ReturnType<typeof LocalStorage>, store: Store) => {
  store.subscribe(
    debounce(() => {
      const state = store.getState();
      const playtime = selectPlaytime(state);
      const tabs = selectTabs(state);
      const quantiles = selectQuantiles(state);
      storage.put(key, { playtime, tabs, quantiles });
    }, 1000)
  );
});

export const persistPlayer = (config: PodloveWebPlayerConfig, store: Store) => {
  const storage = LocalStorage('pwp');
  const key = hashCode().value(config);
  const [, existing = {}] = storage.get<{
    playtime?: number;
    quantiles?: [[number, number]];
    tabs?: {
      [key: string]: boolean;
    };
  }>(key);

  const record = recordState(key, storage) as (store: Store) => void;

  ready(store).then(() => {
    const { tabs } = store.getState();
    const quantiles: [[number, number]] = propOr([], 'quantiles', existing);

    if (config.features.persistPlaystate) {
      if (quantiles.length > 0) {
        store.dispatch(restore());
        store.dispatch(showPauseButton());
      }

      if (existing?.playtime) {
        store.dispatch(backendPlaytime(existing.playtime));
      }

      if (existing?.quantiles) {
        store.dispatch(loadQuantiles(existing.quantiles));
      }
    }

    if (config.features.persistTab && existing?.tabs) {
      const tab = Object.keys(existing.tabs).find(
        (tab) => existing.tabs[tab]
      ) as PodloveWebPlayerTab;
      // prevent double toggling
      if (!tabs[tab]) {
        store.dispatch(toggleTab(tab));
      }
    }

    record(store);
  });
};

export const activeTab = (config, store) => {
  const tab = getActiveTab(config);

  if (!tab) {
    return;
  }

  ready(store).then(() => {
    const state = store.getState();

    // if the tab is already active
    if (path(['tabs', tab], state)) {
      return;
    }

    // if the chapters tab is selected but chapters aren't available
    if (tab === 'chapters' && isEmpty(path(['chapters', 'list'], state))) {
      return;
    }

    store.dispatch(toggleTab(tab));
  });
};

export const visibleComponents = (config, store) => {
  const playtime = sharePlaytime(config);

  ready(store).then((store) => {
    if (playtime) {
      store.dispatch(showSharePlaytime());
    } else {
      store.dispatch(hideSharePlaytime());
    }
  });
};

const stopAt = (stoptime, store) => {
  const unsubscribe = store.subscribe(() => {
    if (selectPlaytime(store.getState()) < stoptime) {
      return;
    }

    unsubscribe();
    store.dispatch(requestPause());
  });
};

export const applyUrlParameters = (store) => {
  ready(store).then(() => {
    const { starttime, stoptime, autoplay } = urlParameters();

    console.log({ starttime, stoptime, autoplay });
    if (starttime || autoplay || stoptime) {
      store.dispatch(restore());
      store.dispatch(showPauseButton());
    }

    if (starttime) {
      store.dispatch(requestPlaytime(starttime));
    }

    if (autoplay) {
      store.dispatch(requestPlay());
    }

    if (stoptime) {
      stopAt(stoptime, store);
    }
  });
};

export default (config: PodloveWebPlayerConfig, store: Store) => {
  persistPlayer(config, store);
  activeTab(config, store);
  visibleComponents(config, store);
  applyUrlParameters(store);
};
