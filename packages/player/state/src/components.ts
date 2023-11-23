import { Action, handleActions } from 'redux-actions';
import { prop, compose } from 'ramda';
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

const tabs = prop('tabs');

export const selectors = {
  playButton: prop('playButton') as (input: State) => PlayButton,
  stepperButtons: prop('stepperButtons') as (input: State) => boolean,
  chapterButtons: prop('chapterButtons') as (input: State) => boolean,
  progressBar: prop('progressBar') as (input: State) => boolean,
  volumeControl: prop('volumeControl') as (input: State) => boolean,
  rateControl: prop('rateControl') as (input: State) => boolean,
  poster: prop('poster') as (input: State) => boolean,
  error: prop('error') as (input: State) => boolean,
  shownotesTab: compose(prop('shownotes'), tabs) as (input: State) => boolean,
  chaptersTab: compose(prop('chapters'), tabs) as (input: State) => boolean,
  transcriptTab: compose(prop('transcripts'), tabs) as (input: State) => boolean,
  shareTab: compose(prop('share'), tabs) as (input: State) => boolean,
  filesTab: compose(prop('files'), tabs) as (input: State) => boolean,
  playlistTab: compose(prop('playlist'), tabs) as (input: State) => boolean,
  audioTab: compose(prop('audio'), tabs) as (input: State) => boolean,
  sharePlaytime: prop('sharePlaytime') as (input: State) => boolean
};
