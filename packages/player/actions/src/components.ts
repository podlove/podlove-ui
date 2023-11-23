import { createAction } from 'redux-actions';
import type { PodloveWebPlayerTab } from '@podlove/types';

import {
  SHOW_COMPONENT_INFO,
  SHOW_COMPONENT_INFO_POSTER,
  SHOW_COMPONENT_CONTROLS_BUTTON,
  SHOW_COMPONENT_TAB,
  SHOW_COMPONENT_VOLUME_SLIDER,
  SHOW_COMPONENT_RATE_SLIDER,
  SHOW_COMPONENT_CHANNELS,
  SHOW_COMPONENT_PROGRESSBAR,
  SHOW_COMPONENT_CONTROLS_STEPPERS,
  SHOW_COMPONENT_CONTROLS_CHAPTERS,
  SHOW_COMPONENT_CONTROLS_BUTTON_LOADING,
  SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY,
  SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING,
  SHOW_COMPONENT_CONTROLS_BUTTON_DURATION,
  SHOW_COMPONENT_CONTROLS_BUTTON_RETRY,
  SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING,
  SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE,
  SHOW_COMPONENT_SHOW_TITLE,
  SHOW_COMPONENT_EPISODE_TITLE,
  SHOW_COMPONENT_SUBTITLE,
  HIDE_COMPONENT_INFO,
  HIDE_COMPONENT_INFO_POSTER,
  HIDE_COMPONENT_ERROR,
  HIDE_COMPONENT_CONTROLS_CHAPTERS,
  HIDE_COMPONENT_CONTROLS_STEPPERS,
  HIDE_COMPONENT_CONTROLS_BUTTON,
  HIDE_COMPONENT_PROGRESSBAR,
  HIDE_COMPONENT_TAB,
  HIDE_COMPONENT_VOLUME_SLIDER,
  HIDE_COMPONENT_RATE_SLIDER,
  HIDE_COMPONENT_CHANNELS,
  HIDE_COMPONENT_SHOW_TITLE,
  HIDE_COMPONENT_EPISODE_TITLE,
  HIDE_COMPONENT_SUBTITLE
} from './types.js';

export type showComponentTabPayload = PodloveWebPlayerTab;
export type hideComponentTabPayload = PodloveWebPlayerTab;

export const showInfo = createAction<void>(SHOW_COMPONENT_INFO);
export const showShowTitle = createAction<void>(SHOW_COMPONENT_SHOW_TITLE);
export const showEpisodeTitle = createAction<void>(SHOW_COMPONENT_EPISODE_TITLE);
export const showSubtitle = createAction<void>(SHOW_COMPONENT_SUBTITLE);
export const showProgressBar = createAction<void>(SHOW_COMPONENT_PROGRESSBAR);
export const showInfoPoster = createAction<void>(SHOW_COMPONENT_INFO_POSTER);
export const showChapterControls = createAction<void>(SHOW_COMPONENT_CONTROLS_CHAPTERS);
export const showSteppersControls = createAction<void>(SHOW_COMPONENT_CONTROLS_STEPPERS);
export const showButtonControl = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON);
export const showLoadingButton = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON_LOADING);
export const showReplayButton = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY);
export const showRemainingButton = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING);
export const showDurationButton = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON_DURATION);
export const showRetryButton = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON_RETRY);
export const showPlayingButton = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING);
export const showPauseButton = createAction<void>(SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE);
export const showComponentTab = createAction<showComponentTabPayload>(SHOW_COMPONENT_TAB);
export const showVolumeSlider = createAction<void>(SHOW_COMPONENT_VOLUME_SLIDER);
export const showRateSlider = createAction<void>(SHOW_COMPONENT_RATE_SLIDER);
export const showChannelsSelection = createAction<void>(SHOW_COMPONENT_CHANNELS);

export const hideInfo = createAction<void>(HIDE_COMPONENT_INFO);
export const hideError = createAction<void>(HIDE_COMPONENT_ERROR);
export const hideProgressBar = createAction<void>(HIDE_COMPONENT_PROGRESSBAR);
export const hideInfoPoster = createAction<void>(HIDE_COMPONENT_INFO_POSTER);
export const hideShowTitle = createAction<void>(HIDE_COMPONENT_SHOW_TITLE);
export const hideEpisodeTitle = createAction<void>(HIDE_COMPONENT_EPISODE_TITLE);
export const hideSubtitle = createAction<void>(HIDE_COMPONENT_SUBTITLE);
export const hideChapterControls = createAction<void>(HIDE_COMPONENT_CONTROLS_CHAPTERS);
export const hideSteppersControls = createAction<void>(HIDE_COMPONENT_CONTROLS_STEPPERS);
export const hideButtonControl = createAction<void>(HIDE_COMPONENT_CONTROLS_BUTTON);
export const hideComponentTab = createAction<hideComponentTabPayload>(HIDE_COMPONENT_TAB);
export const hideVolumeSlider = createAction<void>(HIDE_COMPONENT_VOLUME_SLIDER);
export const hideRateSlider = createAction<void>(HIDE_COMPONENT_RATE_SLIDER);
export const hideChannelsSelection = createAction<void>(HIDE_COMPONENT_CHANNELS);
