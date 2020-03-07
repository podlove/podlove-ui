import 'regenerator-runtime/runtime'

import Root from './root'
import EpisodeTitle from './episode-title'
import ShowTitle from './show-title'
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
import TabTrigger from './tab-trigger'
import TabOverflow from './tab-overflow'
import Error from './error'

export default {
  Root,
  EpisodeTitle,
  ShowTitle,
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

  SubscribeButton: () => import('./subscribe-button'),
  TabChapters: () => import('./tab-chapters'),
  TabTranscripts: () => import('./tab-transcripts'),
  TabFiles: () => import('./tab-files'),
  TabShare: () => import('./tab-share'),
  TabPlaylist: () => import('./tab-playlist'),
  TabShownotes: () => import('./tab-shownotes'),

  Icon: () => import('@podlove/components/icons')
}
