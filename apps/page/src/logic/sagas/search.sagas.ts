import scrollIntoView from 'scroll-into-view-if-needed';
import { types, actions } from '../reducers/search.store';
import { channel } from '@podlove/player-sagas/helper';
import { call, delay, put, select, takeEvery, throttle } from '@redux-saga/core/effects';

const focusSearch = () => {
  setTimeout(() => {
    const search = document.getElementById('search-input');
    search && search.focus();
  }, 300);
};

function nextResult({ selectResults, selectSelectedResult }) {
  return function* (modifier) {
    const results = yield select(selectResults);
    const resultsMap = results.map(({ node }) => node.id);

    if (resultsMap.length === 0) {
      return;
    }

    const selectedResult = yield select(selectSelectedResult);

    const index = resultsMap.findIndex((result) => result === selectedResult);
    const size = resultsMap.length - 1;

    let next;

    if (index === -1) {
      next = 0;
    } else {
      next = index + modifier;
    }

    if (next > size) {
      next = 0;
    }

    if (next < 0) {
      next = size;
    }

    focusResult(resultsMap[next]);
  };
}

function registerKeyHandlers({ selectVisible, selectResults, selectSelectedResult }) {
  return function* (event) {
    const next = nextResult({ selectResults, selectSelectedResult });

    const visible = yield select(selectVisible);

    if (visible && event.key === 'ArrowUp') {
      yield next(-1);
      event.preventDefault();
    }

    if (visible && (event.key === 'ArrowDown' || event.key === 'Tab')) {
      yield next(1);
      event.preventDefault();
    }

    if (event.metaKey && event.code === 'KeyK') {
      if (!visible) {
        yield put(actions.showSearch());
      }

      focusSearch();
    }

    if (visible && event.key === 'Escape') {
      yield put(actions.hideSearch());
    }
  };
}

function focusResult(id) {
  const result = document.querySelector(`[data-result="${id}"]`);
  result && result.focus();
}

function searchForResults({ selectInitialized, search }) {
  return function* ({ payload }) {
    const initialized = yield select(selectInitialized);

    if (!initialized) {
      return;
    }

    const results = search.search(payload);
    yield put(actions.results(results));
  };
}

function* initSearch({ loadSearch, selectInitialized }) {
  const initialized = yield select(selectInitialized);

  if (!initialized) {
    yield put(actions.load());
    yield loadSearch();
    yield put(actions.initializedSearch());
    focusSearch();
  }
}

function selectTranscript(router) {
  return function* ({ payload }) {
    yield router.push({ path: payload.node.episode.path }).catch((err) => {});

    const result = document.evaluate(
      `//span[contains(., "${payload.text}")]`,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );

    if (result) {
      const node = result.iterateNext();
      scrollIntoView(node, { behavior: 'auto', scrollMode: 'always', block: 'center' });
      node.style.background = 'yellow';
    }
    yield put(actions.hideSearch());
  };
}

function selectContributor(router) {
  return function* ({ payload }) {
    yield router.push({ path: payload.path }).catch(() => {});
    yield put(actions.hideSearch());
  };
}

function selectEpisode(router) {
  return function* ({ payload }) {
    yield router.push({ path: payload.path }).catch(() => {});
    yield put(actions.hideSearch());
  };
}

function* disableOverflow() {
  document.body.classList.add('overflow-hidden');
}

function* enableOverflow() {
  document.body.classList.remove('overflow-hidden');
}

export default ({
  selectVisible,
  selectResults,
  selectInitialized,
  selectSelectedResult,
  Vue,
  router
}) => {
  return function* () {
    const keyboardEvents = yield call(channel, (cb) => document.addEventListener('keydown', cb));

    yield takeEvery(
      keyboardEvents,
      registerKeyHandlers({ selectVisible, selectResults, selectSelectedResult })
    );
    yield takeEvery(types.SEARCH_SHOW, initSearch, {
      loadSearch: Vue.prototype.$searchLoad,
      selectInitialized
    });

    yield takeEvery(types.SEARCH_SELECT_TRANSCRIPT, selectTranscript(router));
    yield takeEvery(types.SEARCH_SELECT_CONTRIBUTOR, selectContributor(router));
    yield takeEvery(types.SEARCH_SELECT_EPISODE, selectEpisode(router));
    yield takeEvery(types.SEARCH_SHOW, disableOverflow);
    yield takeEvery(types.SEARCH_HIDE, enableOverflow);

    yield throttle(
      300,
      types.SEARCH_QUERY,
      searchForResults({
        selectInitialized,
        search: Vue.prototype.$search
      })
    );
  };
};
