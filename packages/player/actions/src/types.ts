export const PREFIX = `PLAYER`

const type = (name: string) => `${PREFIX}_${name}`

// Lifecycle
export const CONSTRUCTED = type('CONSTRUCTED') // config was parsed
export const INIT = type('INIT') // initial config
export const READY = type('READY') // config was parsed
export const RESTORE = type('RESTORE') // restored

// Chapters
export const SET_CHAPTERS_LIST = type('SET_CHAPTERS_LIST')
export const NEXT_CHAPTER = type('NEXT_CHAPTER')
export const PREVIOUS_CHAPTER = type('PREVIOUS_CHAPTER')
export const SET_CHAPTER = type('SET_CHAPTER')
export const UPDATE_CHAPTER = type('UPDATE_CHAPTER')

// Steppers
export const STEP_FORWARD = type('STEP_FORWARD')
export const STEP_BACKWARDS = type('STEP_BACKWARDS')

// Components => internal
export const SHOW_COMPONENT_INFO = type('SHOW_COMPONENT_INFO')
export const SHOW_COMPONENT_SHOW_TITLE = type('SHOW_COMPONENT_SHOW_TITLE')
export const SHOW_COMPONENT_EPISODE_TITLE = type('SHOW_COMPONENT_EPISODE_TITLE')
export const SHOW_COMPONENT_SUBTITLE = type('SHOW_COMPONENT_SUBTITLE')
export const SHOW_COMPONENT_INFO_POSTER = type('SHOW_COMPONENT_INFO_POSTER')
export const SHOW_COMPONENT_CONTROLS_CHAPTERS = type('SHOW_COMPONENT_CONTROLS_CHAPTERS')
export const SHOW_COMPONENT_CONTROLS_STEPPERS = type('SHOW_COMPONENT_CONTROLS_STEPPERS')
export const SHOW_COMPONENT_CONTROLS_BUTTON_LOADING = type('SHOW_COMPONENT_CONTROLS_BUTTON_LOADING')
export const SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY = type('SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY')
export const SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING = type(
  'SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING'
)
export const SHOW_COMPONENT_CONTROLS_BUTTON_DURATION = type(
  'SHOW_COMPONENT_CONTROLS_BUTTON_DURATION'
)
export const SHOW_COMPONENT_CONTROLS_BUTTON_RETRY = type('SHOW_COMPONENT_CONTROLS_BUTTON_RETRY')
export const SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING = type('SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING')
export const SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE = type('SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE')
export const SHOW_COMPONENT_PROGRESSBAR = type('SHOW_COMPONENT_PROGRESSBAR')
export const SHOW_COMPONENT_TAB = type('SHOW_COMPONENT_TAB')
export const SHOW_COMPONENT_VOLUME_SLIDER = type('SHOW_COMPONENT_VOLUME_SLIDER')
export const SHOW_COMPONENT_RATE_SLIDER = type('SHOW_COMPONENT_RATE_SLIDER')
export const SHOW_COMPONENT_CHANNELS = type('SHOW_COMPONENT_CHANNELS')
export const SHOW_COMPONENT_CONTROLS_BUTTON = type('SHOW_COMPONENT_CONTROLS_BUTTON')

export const HIDE_COMPONENT_INFO = type('HIDE_COMPONENT_INFO')
export const HIDE_COMPONENT_SHOW_TITLE = type('HIDE_COMPONENT_SHOW_TITLE')
export const HIDE_COMPONENT_EPISODE_TITLE = type('HIDE_COMPONENT_EPISODE_TITLE')
export const HIDE_COMPONENT_SUBTITLE = type('HIDE_COMPONENT_SUBTITLE')
export const HIDE_COMPONENT_INFO_POSTER = type('HIDE_COMPONENT_INFO_POSTER')
export const HIDE_COMPONENT_ERROR = type('HIDE_COMPONENT_ERROR')
export const HIDE_COMPONENT_CONTROLS_CHAPTERS = type('HIDE_COMPONENT_CONTROLS_CHAPTERS')
export const HIDE_COMPONENT_CONTROLS_STEPPERS = type('HIDE_COMPONENT_CONTROLS_STEPPERS')
export const HIDE_COMPONENT_CONTROLS_BUTTON = type('HIDE_COMPONENT_CONTROLS_BUTTON')
export const HIDE_COMPONENT_PROGRESSBAR = type('HIDE_COMPONENT_PROGRESSBAR')
export const HIDE_COMPONENT_TAB = type('HIDE_COMPONENT_TAB')
export const HIDE_COMPONENT_VOLUME_SLIDER = type('HIDE_COMPONENT_VOLUME_SLIDER')
export const HIDE_COMPONENT_RATE_SLIDER = type('HIDE_COMPONENT_RATE_SLIDER')
export const HIDE_COMPONENT_CHANNELS = type('HIDE_COMPONENT_CHANNELS')

// Visible Components => external
export const SHOW_VISIBLE_COMPONENTS_TAB_INFO = type('SHOW_VISIBLE_COMPONENTS_TAB_INFO')
export const SHOW_VISIBLE_COMPONENTS_TAB_CHAPTERS = type('SHOW_VISIBLE_COMPONENTS_TAB_CHAPTERS')
export const SHOW_VISIBLE_COMPONENTS_TAB_FILES = type('SHOW_VISIBLE_COMPONENTS_TAB_FILES')
export const SHOW_VISIBLE_COMPONENTS_TAB_AUDIO = type('SHOW_VISIBLE_COMPONENTS_TAB_AUDIO')
export const SHOW_VISIBLE_COMPONENTS_TAB_SHARE = type('SHOW_VISIBLE_COMPONENTS_TAB_SHARE')
export const SHOW_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS = type(
  'SHOW_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS'
)
export const SHOW_VISIBLE_COMPONENTS_TAB_PLAYLIST = type('SHOW_VISIBLE_COMPONENTS_TAB_PLAYLIST')

export const SHOW_VISIBLE_COMPONENTS_HEADER_POSTER = type('SHOW_VISIBLE_COMPONENTS_HEADER_POSTER')
export const SHOW_VISIBLE_COMPONENTS_HEADER_TITLE = type('SHOW_VISIBLE_COMPONENTS_HEADER_TITLE')
export const SHOW_VISIBLE_COMPONENTS_HEADER_EPISODE = type('SHOW_VISIBLE_COMPONENTS_HEADER_EPISODE')
export const SHOW_VISIBLE_COMPONENTS_HEADER_SUBTITLE = type(
  'SHOW_VISIBLE_COMPONENTS_HEADER_SUBTITLE'
)

export const SHOW_VISIBLE_COMPONENTS_CONTROLS_STEPPER = type(
  'SHOW_VISIBLE_COMPONENTS_CONTROLS_STEPPER'
)
export const SHOW_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS = type(
  'SHOW_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS'
)
export const SHOW_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR = type(
  'SHOW_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR'
)

export const SHOW_SHARE_PLAYTIME = type('SHOW_SHARE_PLAYTIME')

export const HIDE_VISIBLE_COMPONENTS_TAB_INFO = type('HIDE_VISIBLE_COMPONENTS_TAB_INFO')
export const HIDE_VISIBLE_COMPONENTS_TAB_CHAPTERS = type('HIDE_VISIBLE_COMPONENTS_TAB_CHAPTERS')
export const HIDE_VISIBLE_COMPONENTS_TAB_FILES = type('HIDE_VISIBLE_COMPONENTS_TAB_FILES')
export const HIDE_VISIBLE_COMPONENTS_TAB_AUDIO = type('HIDE_VISIBLE_COMPONENTS_TAB_AUDIO')
export const HIDE_VISIBLE_COMPONENTS_TAB_SHARE = type('HIDE_VISIBLE_COMPONENTS_TAB_SHARE')
export const HIDE_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS = type(
  'HIDE_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS'
)
export const HIDE_VISIBLE_COMPONENTS_TAB_PLAYLIST = type('HIDE_VISIBLE_COMPONENTS_TAB_PLAYLIST')

export const HIDE_VISIBLE_COMPONENTS_HEADER_POSTER = type('HIDE_VISIBLE_COMPONENTS_HEADER_POSTER')
export const HIDE_VISIBLE_COMPONENTS_HEADER_TITLE = type('HIDE_VISIBLE_COMPONENTS_HEADER_TITLE')
export const HIDE_VISIBLE_COMPONENTS_HEADER_EPISODE = type('HIDE_VISIBLE_COMPONENTS_HEADER_EPISODE')
export const HIDE_VISIBLE_COMPONENTS_HEADER_SUBTITLE = type(
  'HIDE_VISIBLE_COMPONENTS_HEADER_SUBTITLE'
)

export const HIDE_VISIBLE_COMPONENTS_CONTROLS_STEPPER = type(
  'HIDE_VISIBLE_COMPONENTS_CONTROLS_STEPPER'
)
export const HIDE_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS = type(
  'HIDE_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS'
)
export const HIDE_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR = type(
  'HIDE_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR'
)

export const HIDE_SHARE_PLAYTIME = type('HIDE_SHARE_PLAYTIME')

// Error
export const BACKEND_ERROR = type('BACKEND_ERROR')
export const NETWORK_EMPTY = type('NETWORK_EMPTY')
export const NETWORK_NO_SOURCE = type('NETWORK_NO_SOURCE')
export const ERROR_MISSING_AUDIO_FILES = type('ERROR_MISSING_AUDIO_FILES')
export const ERROR_POSTER_LOAD = type('ERROR_POSTER_LOAD')

// Progress
export const SIMULATE_PLAYTIME = type('SIMULATE_PLAYTIME')
export const ENABLE_GHOST_MODE = type('ENABLE_GHOST_MODE')
export const DISABLE_GHOST_MODE = type('DISABLE_GHOST_MODE')

// Player
export const REQUEST_PLAY = type('REQUEST_PLAY')
export const BACKEND_PLAY = type('BACKEND_PLAY')
export const REQUEST_PAUSE = type('REQUEST_PAUSE')
export const BACKEND_PAUSE = type('BACKEND_PAUSE')
export const REQUEST_RESTART = type('REQUEST_RESTART')
export const BACKEND_BUFFER = type('BACKEND_BUFFER')
export const REQUEST_STOP = type('REQUEST_STOP')
export const IDLE = type('IDLE')
export const BACKEND_LOADING_START = type('BACKEND_LOADING_START')
export const BACKEND_LOADING_END = type('BACKEND_LOADING_END')
export const REQUEST_LOAD = type('REQUEST_LOAD')
export const LOADED = type('LOADED')
export const BACKEND_END = type('BACKEND_END')

// Audio
export const MUTE = type('MUTE')
export const UNMUTE = type('UNMUTE')
export const SET_VOLUME = type('SET_VOLUME')
export const SET_RATE = type('SET_RATE')

// Timepiece
export const BACKEND_DURATION = type('BACKEND_DURATION')
export const BACKEND_PLAYTIME = type('BACKEND_PLAYTIME')
export const REQUEST_PLAYTIME = type('REQUEST_PLAYTIME')
export const UPDATE_PLAYTIME = type('UPDATE_PLAYTIME')
export const BACKEND_LIVESYNC = type('BACKEND_LIVESYNC')

// Quantiles
export const LOAD_QUANTILES = type('LOAD_QUANTILES')
export const SET_QUANTILE = type('SET_QUANTILE')

// Runtime
export const SET_RUNTIME = type('SET_RUNTIME')
export const SET_LANGUAGE = type('SET_LANGUAGE')
export const SET_VERSION = type('SET_VERSION')
export const SET_MODE = type('SET_MODE')

// Share
export const SELECT_CONTENT = type('SELECT_CONTENT')
export const SELECT_CHANNEL = type('SELECT_CHANNEL')
export const SELECT_EMBED_SIZE = type('SELECT_EMBED_SIZE')

// Tabs
export const TOGGLE_TAB = type('TOGGLE_TAB')
export const SET_TABS = type('SET_TABS')

// Theme
export const SET_THEME = type('SET_THEME')

// Transcripts
export const SET_TRANSCRIPTS_TIMELINE = type('SET_TRANSCRIPTS_TIMELINE')
export const UPDATE_TRANSCRIPTS = type('UPDATE_TRANSCRIPTS')
export const TOGGLE_FOLLOW_TRANSCRIPTS = type('TOGGLE_FOLLOW_TRANSCRIPTS')
export const SEARCH_TRANSCRIPTS = type('SEARCH_TRANSCRIPTS')
export const SET_SEARCH_TRANSCRIPTS_RESULTS = type('SET_SEARCH_TRANSCRIPTS_RESULTS')
export const NEXT_SEARCH_RESULT = type('NEXT_SEARCH_RESULT')
export const PREVIOUS_SEARCH_RESULT = type('PREVIOUS_SEARCH_RESULT')
export const RESET_SEARCH_TRANSCRIPTS = type('RESET_SEARCH_TRANSCRIPTS')

// Error
export const SHOW_ERROR = type('SHOW_ERROR')
export const HIDE_ERROR = type('HIDE_ERROR')
export const RETRY_PLAY = type('RETRY_PLAY')
export const ERROR_CONFIG_MEDIA = type('ERROR_CONFIG_MEDIA')
export const ERROR_CONFIG_MISSING = type('ERROR_CONFIG_MISSING')

// Keyboard
export const KEY_UP = type('KEY_UP')
export const KEY_DOWN = type('KEY_DOWN')

// Playlist
export const NEXT_PLAYLIST_ENTRY = type('NEXT_PLAYLIST_ENTRY')
export const SELECT_PLAYLIST_ENTRY = type('SELECT_PLAYLIST_ENTRY')
export const MARK_PLAYLIST_ENTRY_ACTIVE = type('MARK_PLAYLIST_ENTRY_ACTIVE')

// Files
export const FILE_HOVER = type('FILE_HOVER')
export const FILE_SELECT = type('FILE_SELECT')
