import { put, takeEvery, select } from 'redux-saga/effects';
import { isEmpty } from 'ramda';
import { setTranscriptsTimeline } from '@podlove/player-actions/transcripts'
import {
  showPlayingButton,
  showLoadingButton,
  showPauseButton,
  showSteppersControls,
  showChapterControls,
  showReplayButton,
  hideComponentTab,
  showComponentTab,
  hideChapterControls,
  showInfoPoster,
  hideInfoPoster,
  hideEpisodeTitle,
  showSubtitle,
  showEpisodeTitle,
  hideSubtitle,
  showShowTitle,
  hideShowTitle,
  showVolumeSlider,
  hideVolumeSlider,
  showRateSlider
} from '@podlove/player-actions/components';
import type {
  PodloveWebPlayerTranscript,
  PodloveWebPlayerPlaylistItem,
  PodloveWebPlayerChapter,
  PodloveWebPlayerFile,
  PodloveWebPlayerMode,
  PodloveWebPlayerChannel
} from '@podlove/types';
import { setChapters } from '@podlove/player-actions/chapters';
import { backendEnd, backendLoadingEnd, backendLoadingStart, backendPause, backendPlay, type backendLoadingEndPayload } from '@podlove/player-actions/play';
import { selectEpisode } from '@podlove/player-actions/playlist';
import { ready } from '@podlove/player-actions/lifecycle';
import type { Action } from 'redux-actions';

export const componentsSaga = ({
  selectTranscripts,
  selectPlaylist,
  selectChapters,
  selectFiles,
  selectEpisodeCover,
  selectEpisodeTitle,
  selectEpisodeSubtitle,
  selectShowTitle,
  selectShowCover,
  selectRuntimeMode,
  selectRuntimePlatform,
  selectChannels,
  selectEmbedLink
}: {
  selectTranscripts: (input: any) => PodloveWebPlayerTranscript[];
  selectPlaylist: (input: any) => PodloveWebPlayerPlaylistItem[];
  selectChapters: (input: any) => PodloveWebPlayerChapter[];
  selectFiles: (input: any) => PodloveWebPlayerFile[];
  selectEpisodeCover: (input: any) => string;
  selectEpisodeTitle: (input: any) => string;
  selectEpisodeSubtitle: (input: any) => string;
  selectShowTitle: (input: any) => string;
  selectShowCover: (input: any) => string;
  selectRuntimeMode: (input: any) => PodloveWebPlayerMode;
  selectRuntimePlatform: (input: any) => string;
  selectChannels: (input: any) => PodloveWebPlayerChannel[];
  selectEmbedLink: (input: any) => string;
}) =>
  function* saga() {
    yield takeEvery(ready.toString(), init, {
      selectFiles,
      selectPlaylist,
      selectEpisodeCover,
      selectEpisodeTitle,
      selectEpisodeSubtitle,
      selectShowTitle,
      selectShowCover,
      selectRuntimeMode,
      selectRuntimePlatform,
      selectChannels,
      selectEmbedLink
    });
    yield takeEvery(setTranscriptsTimeline.toString(), transcripts, { selectTranscripts });
    yield takeEvery(setChapters.toString(), chapters, { selectChapters });
    yield takeEvery(backendPlay.toString(), play);
    yield takeEvery(selectEpisode.toString(), pause);
    yield takeEvery(backendPause.toString(), pause);
    yield takeEvery(backendLoadingStart.toString(), loading);
    yield takeEvery(backendLoadingEnd.toString(), loaded);
    yield takeEvery(backendEnd.toString(), replay);
  };

export function* init({
  selectFiles,
  selectPlaylist,
  selectEpisodeCover,
  selectEpisodeTitle,
  selectEpisodeSubtitle,
  selectShowCover,
  selectRuntimeMode,
  selectRuntimePlatform,
  selectShowTitle,
  selectChannels,
  selectEmbedLink
}: {
  selectPlaylist: (input: any) => PodloveWebPlayerPlaylistItem[];
  selectFiles: (input: any) => PodloveWebPlayerFile[];
  selectEpisodeCover: (input: any) => string;
  selectEpisodeTitle: (input: any) => string;
  selectEpisodeSubtitle: (input: any) => string;
  selectShowTitle: (input: any) => string;
  selectShowCover: (input: any) => string;
  selectRuntimeMode: (input: any) => PodloveWebPlayerMode;
  selectRuntimePlatform: (input: any) => string;
  selectChannels: (input: any) => PodloveWebPlayerChannel[];
  selectEmbedLink: (input: any) => string;
}) {
  const files = yield select(selectFiles);
  const playlist = yield select(selectPlaylist);
  const showCover = yield select(selectShowCover);
  const episodeCover = yield select(selectEpisodeCover);
  const episodeTitle = yield select(selectEpisodeTitle);
  const subtitle = yield select(selectEpisodeSubtitle);
  const showTitle = yield select(selectShowTitle);
  const mode = yield select(selectRuntimeMode);
  const platform = yield select(selectRuntimePlatform);
  const channels = yield select(selectChannels);
  const embedLink = yield select(selectEmbedLink);

  // Header
  yield put(!!showCover || !!episodeCover ? showInfoPoster() : hideInfoPoster());
  yield put(episodeTitle ? showEpisodeTitle() : hideEpisodeTitle());
  yield put(subtitle ? showSubtitle() : hideSubtitle());
  yield put(showTitle ? showShowTitle() : hideShowTitle());

  // Tabs
  yield put(!isEmpty(files) ? showComponentTab('files') : hideComponentTab('files'));
  yield put(!isEmpty(playlist) ? showComponentTab('playlist') : hideComponentTab('playlist'));
  yield put(showComponentTab('shownotes'));
  yield put(
    !isEmpty(channels) || embedLink ? showComponentTab('share') : hideComponentTab('share')
  );

  // Audio Inputs
  yield put(mode === 'native' && platform === 'desktop' ? showVolumeSlider() : hideVolumeSlider());
  yield put(showRateSlider());

  // Steppers
  yield put(showSteppersControls());
}

export function* transcripts({ selectTranscripts }: { selectTranscripts: (input: any) => PodloveWebPlayerTranscript[] }) {
  const transcripts = yield select(selectTranscripts);
  yield put(transcripts ? showComponentTab('transcripts') : hideComponentTab('transcripts'));
}

export function* chapters({ selectChapters }: { selectChapters: (input: any) => PodloveWebPlayerChapter[] }) {
  const chapters = !isEmpty(yield select(selectChapters));

  yield put(chapters ? showChapterControls() : hideChapterControls());
  yield put(chapters ? showComponentTab('chapters') : hideComponentTab('chapters'));
}

export function* play() {
  yield put(showPlayingButton());
}

export function* pause() {
  yield put(showPauseButton());
}

export function* loading() {
  yield put(showLoadingButton());
}

export function* loaded({ payload }: Action<backendLoadingEndPayload>): any {
  if (payload.paused) {
    yield put(showPauseButton());
  } else {
    yield put(showPlayingButton());
  }
}

export function* replay() {
  yield put(showReplayButton());
}
