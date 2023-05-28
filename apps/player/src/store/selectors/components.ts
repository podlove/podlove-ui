import { compose, propOr, equals, lt, length } from 'ramda';
import { selectors as components } from '@podlove/player-state/components';
import { createSelector } from 'reselect';

import root from './root.js';
import chapters from './chapters.js';

export default {
  playButton: createSelector(root.components, components.playButton),
  chapterButtons: createSelector(root.components, components.chapterButtons),
  stepperButtons: createSelector(root.components, components.stepperButtons),
  progressBar: createSelector(root.components, components.progressBar),
  volumeControl: createSelector(root.components, components.volumeControl),
  rateControl: createSelector(root.components, components.rateControl),
  poster: createSelector(root.components, components.poster),
  error: createSelector(root.components, components.error),
  shownotesTab: createSelector(root.components, components.shownotesTab),
  chaptersTab: createSelector(root.components, components.chaptersTab),
  transcriptTab: createSelector(root.components, components.transcriptTab),
  shareTab: createSelector(root.components, components.shareTab),
  filesTab: createSelector(root.components, components.filesTab),
  playlistTab: createSelector(root.components, components.playlistTab),
  nextChapterDisabled: compose(equals(-1), propOr(-1, 'index'), chapters.next),
  previousChapterDisabled: compose(equals(-1), propOr(-1, 'index'), chapters.previous),
  chaptersChannel: compose(lt(0), length, chapters.list),
  sharePlaytime: createSelector(root.components, components.sharePlaytime)
};
