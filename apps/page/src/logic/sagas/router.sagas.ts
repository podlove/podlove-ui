import { put, takeEvery } from 'redux-saga/effects';
import type { Action } from 'redux-actions';
import { actions } from '../store';
import type { episodePagePayload } from '../store/stores/router.store';

export default function* () {
  function* onEpisodePageNavigate({ payload }: Action<episodePagePayload>) {
    yield put(actions.router.setRoute([payload.base, 'episode', payload.episodeId]));
  }

  yield takeEvery(actions.router.episodePage.toString(), onEpisodePageNavigate);
}
