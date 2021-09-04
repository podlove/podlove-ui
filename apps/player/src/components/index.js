import 'regenerator-runtime/runtime'
import { defineAsyncComponent } from 'vue'

import Root from './root'
import EpisodeTitle from './episode-title'
import EpisodeSubtitle from './episode-subtitle'
import ShowTitle from './show-title'
import PublicationDate from './publication-date'
import Poster from './poster'
import StepForward from './step-forward'
import StepBackward from './step-backward'
import PlayButton from './play-button'
import ProgressBar from './progress-bar'
import TimerCurrent from './timer-current'
import TimerDuration from './timer-duration'
import CurrentChapter from './current-chapter'
import ChapterPrevious from './chapter-previous'
import ChapterNext from './chapter-next'
import PlayState from './play-state'
import VolumeControl from './volume-control'
import SpeedControl from './speed-control'
import Tab from './tab'
import Divider from './divider'
import SubscribeButton from './subscribe-button'
import TabTrigger from './tab-trigger'
import TabOverflow from './tab-overflow'
import Error from './error'

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
  TabChapters: defineAsyncComponent(() => import('./tab-chapters')),
  TabTranscripts: defineAsyncComponent(() => import('./tab-transcripts')),
  // TabFiles: () => import('./tab-files'),
  // TabShare: () => import('./tab-share'),
  // TabPlaylist: () => import('./tab-playlist'),
  TabShownotes: defineAsyncComponent(() => import('./tab-shownotes')),

  // ProgressBarLive: () => import('./progress-bar-live'),

  Icon: defineAsyncComponent(() => import('@podlove/components/icons'))
}
