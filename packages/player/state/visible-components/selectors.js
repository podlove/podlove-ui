import { propOr, compose } from 'ramda'

export const tabs = propOr({}, 'tabs')
export const infoTab = compose(
  propOr(false, 'info'),
  tabs
)
export const chaptersTab = compose(
  propOr(false, 'chapters'),
  tabs
)
export const filesTab = compose(
  propOr(false, 'files'),
  tabs
)
export const audioTab = compose(
  propOr(false, 'audio'),
  tabs
)
export const shareTab = compose(
  propOr(false, 'share'),
  tabs
)
export const transcriptTab = compose(
  propOr(false, 'transcripts'),
  tabs
)

export const header = propOr({}, 'header')
export const poster = compose(
  propOr(false, 'poster'),
  header
)
export const showTitle = compose(
  propOr(false, 'title'),
  header
)
export const episodeTitle = compose(
  propOr(false, 'episode'),
  header
)
export const subtitle = compose(
  propOr(false, 'subtitle'),
  header
)

export const controls = propOr({}, 'controls')
export const controlSteppers = compose(
  propOr(false, 'steppers'),
  controls
)
export const controlChapters = compose(
  propOr(false, 'chapters'),
  controls
)
export const progressBar = compose(
  propOr(false, 'progressbar'),
  controls
)
