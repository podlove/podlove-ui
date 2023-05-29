import { defineAsyncComponent } from 'vue';
import { Icon } from '@podlove/components';

import Root from './root/index.js';
import EpisodeTitle from './episode-title/index.js';
import EpisodeSubtitle from './episode-subtitle/index.js';
import ShowTitle from './show-title/index.js';
import PublicationDate from './publication-date/index.js';
import Poster from './poster/index.js';
import StepForward from './step-forward/index.js';
import StepBackward from './step-backward/index.js';
import PlayButton from './play-button/index.js';
import ProgressBar from './progress-bar/index.js';
import TimerCurrent from './timer-current/index.js';
import TimerDuration from './timer-duration/index.js';
import TimerLive from './timer-live/index.js';
import CurrentChapter from './current-chapter/index.js';
import ChapterPrevious from './chapter-previous/index.js';
import ChapterNext from './chapter-next/index.js';
import PlayState from './play-state/index.js';
import VolumeControl from './volume-control/index.js';
import SpeedControl from './speed-control/index.js';
import Tab from './tab/index.js';
import Divider from './divider/index.js';
import SubscribeButton from './subscribe-button/index.js';
import TabTrigger from './tab-trigger/index.js';
import TabOverflow from './tab-overflow/index.js';
import Error from './error/index.js';

export default {
  Root,
  EpisodeTitle,
  EpisodeSubtitle,
  ShowTitle,
  PublicationDate,
  Poster,
  StepForward,
  StepBackward,
  PlayButton,
  ProgressBar,
  TimerCurrent,
  TimerDuration,
  TimerLive,
  CurrentChapter,
  ChapterPrevious,
  ChapterNext,
  PlayState,
  VolumeControl,
  SpeedControl,
  Tab,
  TabTrigger,
  TabOverflow,
  Divider,
  Error,

  SubscribeButton,
  TabChapters: defineAsyncComponent(() => import('./tab-chapters/index.js')),
  TabTranscripts: defineAsyncComponent(() => import('./tab-transcripts/index.js')),
  TabFiles: defineAsyncComponent(() => import('./tab-files/index.js')),
  TabShare: defineAsyncComponent(() => import('./tab-share/index.js')),
  TabPlaylist: defineAsyncComponent(() => import('./tab-playlist/index.js')),
  TabShownotes: defineAsyncComponent(() => import('./tab-shownotes/index.js')),

  ProgressBarLive: defineAsyncComponent(() => import('./progress-bar-live/index.js')),

  Icon
};
