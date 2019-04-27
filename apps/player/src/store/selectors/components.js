import { compose, allPass, propOr, equals, lt, length } from 'ramda'
import root from './root'
import { selectors as components } from '@podlove/player-state/components'
import { selectors as visibleComponents } from '@podlove/player-state/visible-components'

import timepiece from './timepiece'
import chapters from './chapters'

export default {
  playButton: compose(
    components.playButton,
    root.components
  ),
  chapterButtons: allPass([
    compose(
      components.chapterButtons,
      root.components
    ),
    compose(
      visibleComponents.controlChapters,
      root.visibleComponents
    )
  ]),
  stepperButtons: allPass([
    compose(
      components.stepperButtons,
      root.components
    ),
    compose(
      visibleComponents.controlSteppers,
      root.visibleComponents
    )
  ]),
  progressBar: allPass([
    compose(
      components.progressBar,
      root.components
    ),
    compose(
      visibleComponents.progressBar,
      root.visibleComponents
    )
  ]),
  volumeControl: compose(
    components.volumeControl,
    root.components
  ),
  rateControl: compose(
    components.rateControl,
    root.components
  ),
  poster: allPass([
    compose(
      components.poster,
      root.components
    ),
    compose(
      visibleComponents.poster,
      root.visibleComponents
    )
  ]),
  error: compose(
    components.error,
    root.components
  ),
  showTitle: allPass([
    compose(
      components.showTitle,
      root.components
    ),
    compose(
      visibleComponents.showTitle,
      root.visibleComponents
    )
  ]),
  episodeTitle: allPass([
    compose(
      components.episodeTitle,
      root.components
    ),
    compose(
      visibleComponents.episodeTitle,
      root.visibleComponents
    )
  ]),
  subtitle: allPass([
    compose(
      components.subtitle,
      root.components
    ),
    compose(
      visibleComponents.subtitle,
      root.visibleComponents
    )
  ]),
  infoTab: allPass([
    compose(
      components.infoTab,
      root.components
    ),
    compose(
      visibleComponents.infoTab,
      root.visibleComponents
    )
  ]),
  chaptersTab: allPass([
    compose(
      components.chaptersTab,
      root.components
    ),
    compose(
      visibleComponents.chaptersTab,
      root.visibleComponents
    )
  ]),
  transcriptTab: allPass([
    compose(
      components.transcriptTab,
      root.components
    ),
    compose(
      visibleComponents.transcriptTab,
      root.visibleComponents
    )
  ]),
  shareTab: allPass([
    compose(
      components.shareTab,
      root.components
    ),
    compose(
      visibleComponents.shareTab,
      root.visibleComponents
    )
  ]),
  filesTab: allPass([
    compose(
      components.filesTab,
      root.components
    ),
    compose(
      visibleComponents.filesTab,
      root.visibleComponents
    )
  ]),
  audioTab: allPass([
    compose(
      components.audioTab,
      root.components
    ),
    compose(
      visibleComponents.audioTab,
      root.visibleComponents
    )
  ]),
  nextStepDisabled: state => timepiece.duration(state) - timepiece.playtime(state) <= 1000,
  previousStepDisabled: state => timepiece.playtime(state) <= 1000,
  nextChapterDisabled: compose(
    equals(-1),
    propOr(-1, 'index'),
    chapters.next
  ),
  previousChapterDisabled: compose(
    equals(-1),
    propOr(-1, 'index'),
    chapters.previous
  ),
  chaptersChannel: compose(
    lt(0),
    length,
    chapters.list
  )
}
