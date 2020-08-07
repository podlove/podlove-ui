import { prop } from 'ramda'
import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time'

import episode from './episode'
import show from './show'
import chapters from './chapters'
import timepiece from './timepiece'
import driver from './driver'
import transcripts from './transcripts'

const translation = (key, attr = {}) => ({ key, attr })

export default {
  chapterNext: state => {
    const next = chapters.next(state)

    if (!next) {
      return translation('A11Y.PLAYER_CHAPTER_END')
    }

    return translation('A11Y.PLAYER_CHAPTER_NEXT', next)
  },

  chapterPrevious: state => {
    const previous = chapters.previous(state)
    const current = chapters.current(state)
    const playtime = timepiece.playtime(state)

    if (!previous) {
      return translation('A11Y.PLAYER_CHAPTER_START')
    }

    if (current.start + 2000 > playtime) {
      return translation('A11Y.PLAYER_CHAPTER_CURRENT', current)
    }

    return translation('A11Y.PLAYER_CHAPTER_PREVIOUS', previous)
  },

  currentChapter: state => {
    return translation('A11Y.TIMER_CHAPTER', chapters.current(state))
  },

  playButtonPause: state => {
    return translation('A11Y.PLAYER_PAUSE', chapters.current(state))
  },

  playButtonDuration: state => {
    const duration = timepiece.duration(state)
    const playtime = timepiece.playtime(state)

    return translation('A11Y.PLAYER_START', {
      hours: calcHours(playtime > 0 ? playtime : duration),
      minutes: calcMinutes(playtime > 0 ? playtime : duration),
      seconds: calcSeconds(playtime > 0 ? playtime : duration)
    })
  },

  playButtonReplay: () => {
    return translation('A11Y.PLAYER_LOADING')
  },

  playButtonPlay: () => {
    return translation('A11Y.PLAYER_PLAY')
  },

  playButtonError: () => {
    return translation('A11Y.PLAYER_ERROR')
  },

  stepperBackwards: () => {
    return translation('A11Y.PLAYER_STEPPER_BACK', { seconds: 15 })
  },

  stepperForward: () => {
    return translation('A11Y.PLAYER_STEPPER_FORWARD', { seconds: 30 })
  },

  progressBar: () => {
    return translation('A11Y.PROGRESSBAR_INPUT')
  },

  tabTrigger: () => {
    return translation('A11Y.TAB_TRIGGER')
  },

  tabPanel: () => {
    return translation('A11Y.TAB_PANEL')
  },

  chapterPlay: chapter => state => {
    const playing = driver.playing(state)
    const current = chapters.current(state)

    if (chapter.index === current.index && playing) {
      return translation('A11Y.CHAPTER_PAUSE')
    }

    return translation('A11Y.CHAPTER_PLAY', chapter)
  },

  chapterTimerRemaining: chapter => state => {
    const playtime = timepiece.playtime(state)
    const left = chapter.end - playtime

    if (chapter.start > playtime) {
      return translation('A11Y.TIMER_REMAINING', {
        hours: calcHours(chapter.end - chapter.start),
        minutes: calcMinutes(chapter.end - chapter.start),
        seconds: calcSeconds(chapter.end - chapter.start)
      })
    }

    return translation('A11Y.TIMER_REMAINING', {
      hours: calcHours(left >= 0 ? left : 0),
      minutes: calcMinutes(left >= 0 ? left : 0),
      seconds: calcSeconds(left >= 0 ? left : 0)
    })
  },

  timerCurrent: state => {
    const playtime = timepiece.playtime(state)

    return translation('A11Y.TIMER_CURRENT', {
      hours: calcHours(playtime),
      minutes: calcMinutes(playtime),
      seconds: calcSeconds(playtime)
    })
  },

  timerDuration: state => {
    const duration = timepiece.duration(state)

    return translation('A11Y.TIMER_REMAINING', {
      hours: calcHours(duration),
      minutes: calcMinutes(duration),
      seconds: calcSeconds(duration)
    })
  },

  chapterList: () => {
    return translation('A11Y.CHAPTER_LIST')
  },

  closeTab: tab => () => {
    return translation('A11Y.TAB_CLOSE.' + tab.toUpperCase())
  },

  transcriptsSearch: () => {
    return translation('A11Y.TRANSCRIPTS_SEARCH')
  },

  clearTranscriptsSearch: () => {
    return translation('A11Y.TRANSCRIPTS_SEARCH_CLEAR')
  },

  previousTranscriptsSearchResult: () => {
    return translation('A11Y.TRANSCRIPTS_SEARCH_PREVIOUS')
  },

  nextTranscriptsSearchResult: () => {
    return translation('A11Y.TRANSCRIPTS_SEARCH_NEXT')
  },

  followTranscripts: state => {
    if (transcripts.follow(state)) {
      return translation('A11Y.TRANSCRIPTS_UNFOLLOW')
    }

    return translation('A11Y.TRANSCRIPTS_FOLLOW')
  },

  episodeList: () => {
    return translation('A11Y.EPISODE_LIST')
  },

  episodePlay: episode => state => {
    const playing = driver.playing(state)

    if (episode.active && playing) {
      return translation('A11Y.EPISODE_PAUSE', episode)
    }

    return translation('A11Y.EPISODE_PLAY', episode)
  },

  episodeDuration: episode => () => {
    return translation('A11Y.TIMER_DURATION', {
      hours: calcHours(episode.duration),
      minutes: calcMinutes(episode.duration),
      seconds: calcSeconds(episode.duration)
    })
  },

  shareChannel: () => channel => {
    if (channel === 'link') {
      return translation('A11Y.COPY_SHARE_LINK')
    }

    return translation('A11Y.SHARE_CHANNEL', { channel })
  },

  embedCode: () => {
    return translation('A11Y.SHARE_EMBED_CODE')
  },

  copyShareLink: () => {
    return translation('A11Y.COPY_SHARE_LINK')
  },

  copyEmbedLink: () => {
    return translation('A11Y.COPY_EMBED_CODE')
  },

  volumeButton: () => {
    return translation('A11Y.VOLUME_CONTROL')
  },

  volumeControl: () => {
    return translation('A11Y.SET_VOLUME_IN_PERCENT')
  },

  speedControl: () => speed => {
    return translation('A11Y.SPEED_CONTROL', { speed })
  },

  subscribeButton: () => {
    return translation('A11Y.SUBSCRIBE_BUTTON')
  }
}
