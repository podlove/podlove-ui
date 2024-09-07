import { Action, handleActions } from 'redux-actions';
import { get } from 'lodash-es';
import {
  hideError,
  hideButtonControl,
  hideChapterControls,
  hideComponentTab,
  hideEpisodeTitle,
  hideInfoPoster,
  hideProgressBar,
  hideRateSlider,
  hideShowTitle,
  hideSteppersControls,
  hideSubtitle,
  hideVolumeSlider,
  showChapterControls,
  showComponentTab,
  showDurationButton,
  showEpisodeTitle,
  showInfoPoster,
  showLoadingButton,
  showPauseButton,
  showPlayingButton,
  showProgressBar,
  showRateSlider,
  showRemainingButton,
  showReplayButton,
  showRetryButton,
  showShowTitle,
  showSteppersControls,
  showSubtitle,
  showVolumeSlider,
  showComponentTabPayload,
  hideComponentTabPayload
} from '@podlove/player-actions/components';
import { hideSharePlaytime, showSharePlaytime } from '@podlove/player-actions/visible-components';

type PlayButton =
  | 'duration'
  | 'playing'
  | 'paused'
  | 'loading'
  | 'replay'
  | 'remaining'
  | 'retry'
  | boolean;

export interface State {
  playButton: PlayButton;
  progressBar: boolean;
  chapterButtons: boolean;
  stepperButtons: boolean;
  volumeControl: boolean;
  rateControl: boolean;
  poster: boolean;
  error: boolean;
  info: {
    episodeTitle: boolean;
    showTitle: boolean;
    subtitle: boolean;
  };
  tabs: {
    shownotes: boolean;
    chapters: boolean;
    transcripts: boolean;
    share: boolean;
    files: boolean;
    audio: boolean;
    playlist: boolean;
  };
  sharePlaytime: boolean;
}

export const INITIAL_STATE: State = {
  playButton: 'duration',
  progressBar: false,
  chapterButtons: false,
  stepperButtons: false,
  volumeControl: false,
  rateControl: false,
  error: false,
  poster: false,
  info: {
    episodeTitle: false,
    showTitle: false,
    subtitle: false
  },
  tabs: {
    shownotes: false,
    chapters: false,
    transcripts: false,
    share: false,
    files: false,
    audio: false,
    playlist: false
  },
  sharePlaytime: true
};

export const reducer = handleActions<State, showComponentTabPayload | hideComponentTabPayload>(
  {
    [hideError.toString()]: (state) => ({
      ...state,
      error: false
    }),
    [showInfoPoster.toString()]: (state) => ({
      ...state,
      poster: true
    }),
    [hideInfoPoster.toString()]: (state) => ({
      ...state,
      poster: false
    }),
    [hideButtonControl.toString()]: (state) => ({
      ...state,
      playButton: false
    }),
    [showPlayingButton.toString()]: (state) => ({
      ...state,
      playButton: 'playing'
    }),
    [showDurationButton.toString()]: (state) => ({
      ...state,
      playButton: 'duration'
    }),
    [showPauseButton.toString()]: (state) => ({
      ...state,
      playButton: 'paused'
    }),
    [showLoadingButton.toString()]: (state) => ({
      ...state,
      playButton: 'loading'
    }),
    [showReplayButton.toString()]: (state) => ({
      ...state,
      playButton: 'replay'
    }),
    [showRemainingButton.toString()]: (state) => ({
      ...state,
      playButton: 'remaining'
    }),
    [showRetryButton.toString()]: (state) => ({
      ...state,
      playButton: 'retry'
    }),
    [showChapterControls.toString()]: (state) => ({
      ...state,
      chapterButtons: true
    }),
    [hideChapterControls.toString()]: (state) => ({
      ...state,
      chapterButtons: false
    }),
    [showSteppersControls.toString()]: (state) => ({
      ...state,
      stepperButtons: true
    }),
    [hideSteppersControls.toString()]: (state) => ({
      ...state,
      stepperButtons: false
    }),
    [showProgressBar.toString()]: (state) => ({
      ...state,
      progressBar: true
    }),
    [hideProgressBar.toString()]: (state) => ({
      ...state,
      progressBar: false
    }),
    [showVolumeSlider.toString()]: (state) => ({
      ...state,
      volumeControl: true
    }),
    [hideVolumeSlider.toString()]: (state) => ({
      ...state,
      volumeControl: false
    }),
    [showRateSlider.toString()]: (state) => ({
      ...state,
      rateControl: true
    }),
    [hideRateSlider.toString()]: (state) => ({
      ...state,
      rateControl: false
    }),
    [showComponentTab.toString()]: (state, { payload }: Action<showComponentTabPayload>) => ({
      ...state,
      tabs: {
        ...state.tabs,
        [payload]: true
      }
    }),
    [hideComponentTab.toString()]: (state, { payload }: Action<hideComponentTabPayload>) => ({
      ...state,
      tabs: {
        ...state.tabs,
        [payload]: false
      }
    }),
    [showShowTitle.toString()]: (state) => ({
      ...state,
      info: {
        ...state.info,
        showTitle: true
      }
    }),
    [hideShowTitle.toString()]: (state) => ({
      ...state,
      info: {
        ...state.info,
        showTitle: false
      }
    }),
    [showEpisodeTitle.toString()]: (state) => ({
      ...state,
      info: {
        ...state.info,
        episodeTitle: true
      }
    }),
    [hideEpisodeTitle.toString()]: (state) => ({
      ...state,
      info: {
        ...state.info,
        episodeTitle: false
      }
    }),
    [showSubtitle.toString()]: (state) => ({
      ...state,
      info: {
        ...state.info,
        subtitle: true
      }
    }),
    [hideSubtitle.toString()]: (state) => ({
      ...state,
      info: {
        ...state.info,
        subtitle: false
      }
    }),
    [showSharePlaytime.toString()]: (state) => ({
      ...state,
      sharePlaytime: true
    }),
    [hideSharePlaytime.toString()]: (state) => ({
      ...state,
      sharePlaytime: false
    })
  },
  INITIAL_STATE
);

// const tabs = prop('tabs');

export const selectors = {
  playButton: (state: State) => state.playButton,
  stepperButtons: (state: State) => state.stepperButtons,
  chapterButtons: (state: State) => state.chapterButtons,
  progressBar: (state: State) => state.progressBar,
  volumeControl: (state: State) => state.volumeControl,
  rateControl: (state: State) => state.rateControl,
  poster: (state: State) => state.poster,
  error: (state: State) => state.error,
  sharePlaytime: (state: State) => state.sharePlaytime,
  shownotesTab: (state: State) => get(state, ['tabs', 'shownotes']),
  chaptersTab: (state: State) => get(state, ['tabs', 'chapters']),
  transcriptTab: (state: State) => get(state, ['tabs', 'transcripts']),
  shareTab: (state: State) => get(state, ['tabs', 'share']),
  filesTab: (state: State) => get(state, ['tabs', 'files']),
  playlistTab: (state: State) => get(state, ['tabs', 'playlist']),
  audioTab: (state: State) => get(state, ['tabs', 'audio']),
};
