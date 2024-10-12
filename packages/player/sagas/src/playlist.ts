import { get } from 'lodash-es';
import { put, takeEvery, select } from 'redux-saga/effects';
import { init, ready } from '@podlove/player-actions/lifecycle';
import * as player from '@podlove/player-actions/play';
import * as playlist from '@podlove/player-actions/playlist';
import { errorConfigMissing } from '@podlove/player-actions/error';
import { json } from '@podlove/utils/request';
import { setRate, setVolume, mute, unmute } from '@podlove/player-actions/audio';
import type { PodloveWebPlayerPlaylistItem } from '@podlove/types';
import type { Action } from 'redux-actions';
import type { nextEpisodePayload } from '@podlove/player-actions/playlist';
import type { selectEpisodePayload } from '@podlove/player-actions/playlist';

import { takeOnce } from './helper.js';

export const playlistSaga = ({
  selectEpisodeConfig,
  selectRate,
  selectVolume,
  selectMuted,
  selectPlaylist,
  selectReference
}: {
  selectEpisodeConfig: (input: any) => string;
  selectRate: (input: any) => number;
  selectVolume: (input: any) => number;
  selectMuted: (input: any) => boolean;
  selectPlaylist: (input: any) => PodloveWebPlayerPlaylistItem[];
  selectReference: (input: any) => string;
}) =>
  function* saga() {
    yield takeEvery(playlist.nextEpisode.toString(), nextEpisode, { selectPlaylist });
    yield takeEvery(playlist.selectEpisode.toString(), loadEpisode, {
      selectEpisodeConfig,
      selectRate,
      selectVolume,
      selectMuted
    });
    yield takeEvery(player.backendEnd.toString(), episodeEnd);
    yield takeOnce(ready.toString(), setActiveEntry, { selectPlaylist, selectReference });
  };

export function* loadEpisode(
  {
    selectEpisodeConfig,
    selectRate,
    selectVolume,
    selectMuted
  }: {
    selectEpisodeConfig: (input: any) => string;
    selectRate: (input: any) => number;
    selectVolume: (input: any) => number;
    selectMuted: (input: any) => boolean;
  },
  { payload: { play } }: Action<selectEpisodePayload>
): any {
  const url = yield select(selectEpisodeConfig);
  const config = yield json(url);

  const rate = yield select(selectRate);
  const volume = yield select(selectVolume);
  const muted = yield select(selectMuted);

  if (!config) {
    return yield put(errorConfigMissing());
  }

  if (play) {
    yield put(player.requestPause());
  }

  yield put(init(config));

  if (play) {
    yield takeOnce(ready.toString(), requestPlay);
  }

  yield takeOnce(player.backendLoadingStart.toString(), resetMeta, { rate, volume, muted });
}

export function* nextEpisode(
  { selectPlaylist }: { selectPlaylist: (input: any) => PodloveWebPlayerPlaylistItem[] },
  { payload: { play } }: Action<nextEpisodePayload>
): any {
  const list = yield select(selectPlaylist);
  const current = list.findIndex(({ active }) => active);
  const next = current + 1;

  if (list.length === 0) {
    return;
  }

  // nothing selected yet
  if (current < 0) {
    return yield put(playlist.selectEpisode({ index: 0, play }));
  }

  // start from beginning
  if (next >= list.length) {
    return yield put(playlist.selectEpisode({ index: 0, play }));
  }

  return yield put(playlist.selectEpisode({ index: next, play }));
}

export function* episodeEnd() {
  yield put(playlist.nextEpisode({ play: true }));
}

export function* resetMeta({ rate, volume, muted }) {
  yield put(setRate(rate));
  yield put(setVolume(volume));

  yield put(muted ? mute() : unmute());
}

export function* setActiveEntry({ selectPlaylist, selectReference }) {
  const entries = yield select(selectPlaylist);
  const reference = yield select(selectReference);

  if (!reference) {
    return;
  }

  const index = entries.findIndex((entry) =>
    (get(entry, 'config', '') as string).endsWith(reference)
  );

  if (index > -1) {
    yield put(playlist.markActive(index));
  }
}

export function* requestPlay() {
  yield put(player.requestPlay());
}
