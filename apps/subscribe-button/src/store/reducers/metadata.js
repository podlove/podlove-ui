import { handleActions } from 'redux-actions'
import { prop } from 'ramda'
import { INIT } from '@podlove/button-actions/types'

// export const INITIAL_STATE = {
//   title: '',
//   subtitle: '',
//   description: '',
//   feed: []
// }
export const INITIAL_STATE = {
  title: 'Freak Show',
  subtitle: 'Menschen! Technik! Sensationen!',
  description:
    'Die muntere Talk Show um Leben mit Technik, das Netz und Technikkultur. Wir leben und lieben Technologie und reden dar\u00fcber.',
  feed: [
    {
      type: 'audio',
      format: 'aac',
      url: 'https://freakshow.fm/feed/m4a',
      variant: 'high',
      'directory-url-itunes': 'https://itunes.apple.com/podcast/id277518737'
    },
    { type: 'audio', format: 'mp3', url: 'https://freakshow.fm/feed/mp3', variant: 'high' },
    { type: 'audio', format: 'ogg', url: 'https://freakshow.fm/feed/oga', variant: 'high' },
    { type: 'audio', format: 'opus', url: 'https://freakshow.fm/feed/opus', variant: 'high' }
  ]
}

export const reducer = handleActions(
  {
    [INIT]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  INITIAL_STATE
)

export const title = prop('title')
export const subtitle = prop('subtitle')
export const description = prop('description')
export const feed = prop('feed')
