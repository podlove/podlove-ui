import 'regenerator-runtime/runtime'

export default {
  Root: import('./root'),
  EpisodeTitle: import('./episode-title'),
  ShowTitle: import('./show-title'),
  Poster: import('./poster'),
  StepForward: import('./step-forward'),
  StepBackward: import('./step-backward'),
  PlayButton: import('./play-button'),
  ProgressBar: import('./progress-bar'),
  TimerCurrent: import('./timer-current'),
  TimerDuration: import('./timer-duration'),
  CurrentChapter: import('./current-chapter'),
  ChapterPrevious: import('./chapter-previous'),
  ChapterNext: import('./chapter-next'),
  PlayState: import('./play-state'),
  VolumeControl: import('./volume-control'),
  SpeedControl: import('./speed-control'),
  Tab: import('./tab'),
  TabTrigger: import('./tab-trigger'),
  TabOverflow: import('./tab-overflow'),
  Divider: import('./divider'),
  Error: import('./error'),

  SubscribeButton: () => import('./subscribe-button'),
  TabChapters: () => import('./tab-chapters'),
  TabTranscripts: () => import('./tab-transcripts'),
  TabFiles: () => import('./tab-files'),
  TabShare: () => import('./tab-share'),
  TabPlaylist: () => import('./tab-playlist'),
  TabShownotes: () => import('./tab-shownotes'),

  Icon: () => import('@podlove/components/icons')
}
