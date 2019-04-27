import { prop, compose } from 'ramda'

export const playButton = prop('playButton')
export const stepperButtons = prop('stepperButtons')
export const chapterButtons = prop('chapterButtons')
export const progressBar = prop('progressBar')
export const volumeControl = prop('volumeControl')
export const rateControl = prop('rateControl')
export const poster = prop('poster')
export const error = prop('error')

const tabs = prop('tabs')

export const infoTab = compose(
  prop('info'),
  tabs
)
export const chaptersTab = compose(
  prop('chapters'),
  tabs
)
export const transcriptTab = compose(
  prop('transcripts'),
  tabs
)
export const shareTab = compose(
  prop('share'),
  tabs
)
export const filesTab = compose(
  prop('files'),
  tabs
)
export const audioTab = compose(
  prop('audio'),
  tabs
)

const info = prop('info')

export const episodeTitle = compose(
  prop('episodeTitle'),
  info
)
export const showTitle = compose(
  prop('showTitle'),
  info
)
export const subtitle = compose(
  prop('subtitle'),
  info
)
