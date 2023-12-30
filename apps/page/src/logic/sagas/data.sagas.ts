import type { Action } from 'redux-actions';
import { put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '../store';
import parseFeed from '../data/feed-parser';
import type { initializePayload } from '../store/stores/runtime.store';
import type { Podcast } from '../../types/feed.types';

function* fetchData(input: Action<initializePayload>) {
  const feedData: Podcast = yield parseFeed(input.payload.feed);
  yield put(actions.dataFetched(feedData));
}

export default ({ selectInitializedApp }: { selectInitializedApp: (input: any) => boolean }) => {
  return function* () {
    const initialized: boolean = yield select(selectInitializedApp);

    if (initialized) {
      return;
    }

    yield takeEvery(actions.initializeApp.toString(), fetchData);
  };
};
