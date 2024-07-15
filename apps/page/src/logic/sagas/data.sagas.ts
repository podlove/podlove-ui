import type { Action } from 'redux-actions';
import { put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '../store';
import parseFeed from '../data/feed-parser';
import type { initializeAppPayload } from '../store/stores/runtime.store';
import type { Podcast } from '../../types/feed.types';
import { version } from '../../../package.json';
import { etag } from '../../lib/caching.js';

function* fetchData(input: Action<initializeAppPayload>) {
  const data: Podcast = yield parseFeed(input.payload);

  const cacheKey: string | null = data.etag ? yield etag({
    feed: data.etag,
    version
  }) : null

  yield put(actions.lifecycle.dataFetched({ data, cacheKey }));
}

export default ({ selectInitializedApp }: { selectInitializedApp: (input: any) => boolean }) => {
  return function* () {
    const initialized: boolean = yield select(selectInitializedApp);

    if (initialized) {
      return;
    }

    yield takeEvery(actions.lifecycle.initializeApp.toString(), fetchData);
  };
};
