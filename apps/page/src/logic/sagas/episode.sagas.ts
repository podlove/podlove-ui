import { delay } from 'redux-saga/effects';
import { put, takeEvery, select } from 'redux-saga/effects';
import { requestPlay, requestPause, backendLoadingStart } from '@podlove/player-actions/play';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { takeOnce } from '@podlove/player-sagas/helper';
import { setRate, setVolume, mute, unmute } from '@podlove/player-actions/audio';
import { ready } from '@podlove/player-actions/lifecycle';
import { isNil } from 'lodash-es';
import type { Action } from 'redux-actions';

import { actions } from '../store';
import type { Episode, Show, Transcript } from '../../types/feed.types';
import type { playEpisodePayload, restoreEpisodePayload } from '../store/stores/player.store';
import { toPlayerEpisode } from '../transformations/player';

export default ({
  selectEpisode,
  selectShow,
  selectRate,
  selectVolume,
  selectMuted,
  selectCurrentEpisode,
  selectPlaying
}: {
  selectEpisode: (id: string | number) => (input: any) => Episode;
  selectShow: (input: any) => Show;
  selectRate: (input: any) => number;
  selectVolume: (input: any) => number;
  selectMuted: (input: any) => boolean;
  selectPlaying: (input: any) => boolean;
  selectCurrentEpisode: (input: any) => string | null;
}) => {
  function* resetMeta() {
    const rate: number = yield select(selectRate);
    const volume: number = yield select(selectVolume);
    const muted: boolean = yield select(selectMuted);

    yield put(setRate(rate));
    yield put(setVolume(volume));

    yield put(muted ? mute() : unmute());
  }

  function* loadEpisode(id: string | number) {
    let episode: Episode = yield select(selectEpisode(id));

    if (typeof episode.transcripts === 'string') {
      const result: Transcript[] = yield fetch(episode.transcripts);
      yield put(actions.updateEpisode({ id: episode.id, transcripts: result }));
    }

    return episode;
  }

  function* injectEpisode(episode: Episode) {
    const playing: boolean = yield select(selectPlaying);

    if (playing) {
      yield put(requestPause());
    }

    // episode as
    const show: Show = yield select(selectShow);
    yield put(ready(toPlayerEpisode(episode, show)));
    yield delay(100);
    yield put(requestPlay());
    yield takeOnce(backendLoadingStart.toString(), resetMeta);
  }

  function* playEpisode({ payload: { id, playtime } }: Action<playEpisodePayload>) {
    const currentEpisode: string = yield select(selectCurrentEpisode);
    const playing: boolean = yield select(selectPlaying);

    if (currentEpisode === id && playing && !isNil(playtime)) {
      yield put(requestPlaytime(playtime));
      return;
    }

    yield put(actions.selectEpisode(id));

    const episode: Episode = yield loadEpisode(id);

    if (currentEpisode !== id) {
      yield injectEpisode(episode);
    } else {
      yield put(requestPlay());
    }

    if (playtime) {
      yield put(requestPlaytime(playtime));
    }
  }

  function* pauseEpisode() {
    yield put(requestPause());
  }

  function* restoreEpisode({ payload: { id, playtime } }: Action<restoreEpisodePayload>) {
    yield put(requestPause());
    yield put(actions.selectEpisode(id));

    const episode: Episode = yield loadEpisode(id);
    const show: Show = yield select(selectShow);
    yield put(ready(toPlayerEpisode(episode, show)));
    yield delay(100);
    if (playtime) {
      yield put(requestPlaytime(playtime));
    }
    yield takeOnce(backendLoadingStart.toString(), resetMeta);
  }

  return function* () {
    yield takeEvery(actions.playEpisode.toString(), playEpisode);
    yield takeEvery(actions.pauseEpisode.toString(), pauseEpisode);
    yield takeEvery(actions.restoreEpisode.toString(), restoreEpisode);
  };
};
