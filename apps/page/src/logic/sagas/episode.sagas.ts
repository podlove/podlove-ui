import { put, takeEvery, select } from 'redux-saga/effects';
import {
  requestPlay,
  requestPause,
  backendLoadingStart,
  requestLoad,
} from '@podlove/player-actions/play';
import { backendPlaytime, requestPlaytime } from '@podlove/player-actions/timepiece';
import { takeOnce } from '@podlove/player-sagas/helper';
import { setRate, setVolume, mute, unmute } from '@podlove/player-actions/audio';
import { init, ready } from '@podlove/player-actions/lifecycle';
import { isNil } from 'lodash-es';
import type { Action } from 'redux-actions';

import { actions } from '../store';
import type { Episode, Show } from '../../types/feed.types';
import type { playEpisodePayload } from '../store/stores/player.store';
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

  function* injectEpisode(episode: Episode) {
    const playing: boolean = yield select(selectPlaying);

    if (playing) {
      yield put(requestPause());
    }

    const show: Show = yield select(selectShow);
    yield put(init(toPlayerEpisode(episode, show)));
    yield put(requestLoad());

    yield takeOnce(ready.toString(), requestPlayEpisode);
    yield takeOnce(backendLoadingStart.toString(), resetMeta);
  }

  function* playEpisode({ payload: { id, playtime } }: Action<playEpisodePayload>) {
    const currentEpisode: string = yield select(selectCurrentEpisode);

    if (currentEpisode === id && !isNil(playtime)) {
      yield put(requestPlaytime(playtime));
      yield put(requestPlay());
      return;
    }

    yield put(actions.player.selectEpisode(id));

    const episode: Episode = yield select(selectEpisode(id));

    if (currentEpisode !== id) {
      yield injectEpisode(episode);
    } else {
      yield put(requestPlay());
    }

    if (!isNil(playtime)) {
      yield takeOnce(backendPlaytime.toString(), requestPlaytimeEpisode, [playtime]);
    }
  }

  function* pauseEpisode() {
    yield put(requestPause());
  }

  function* requestPlayEpisode() {
    yield put(requestPlay());
  }

  function* requestPlaytimeEpisode(playtime: number) {
    yield put(requestPlaytime(playtime));
  }

  return function* () {
    yield takeEvery(actions.player.playEpisode.toString(), playEpisode);
    yield takeEvery(actions.player.pauseEpisode.toString(), pauseEpisode);
  };
};
