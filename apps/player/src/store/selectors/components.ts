import { selectors as components } from '@podlove/player-state/components';
import { createSelector } from 'reselect';
import { get } from 'lodash-es';

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
  nextChapterDisabled: createSelector(chapters.next, (chapter) => get(chapter, 'index', -1) === -1),
  previousChapterDisabled: createSelector(chapters.previous, (chapter) => get(chapter, 'index', -1) === -1),
  chaptersChannel: createSelector(chapters.list, (chapters) => chapters.length > 0),
  sharePlaytime: createSelector(root.components, components.sharePlaytime)
};
