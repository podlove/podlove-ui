import { fallbackTo } from './helper'
import { find, propEq, compose, curry, findIndex, defaultTo, add, propOr } from 'ramda'

const emptyChapter = {
  start: null,
  end: null,
  title: null,
  href: null,
  index: -1
}

export const getChapterByIndex = chapters => index => propOr(emptyChapter, index, chapters)

export const currentChapterIndex = compose(
  fallbackTo(-1),
  findIndex(propEq('active', true)),
  defaultTo([])
)
export const currentChapter = compose(
  fallbackTo(emptyChapter),
  find(propEq('active', true)),
  defaultTo([])
)

export const nextChapter = chapters =>
  compose(getChapterByIndex(chapters), add(1), currentChapterIndex)(chapters)

export const previousChapter = chapters =>
  compose(getChapterByIndex(chapters), add(-1), currentChapterIndex)(chapters)

export const currentChapterByPlaytime = curry((chapters, playtime) =>
  find(chapter => {
    if (playtime < chapter.start) {
      return false
    }

    if (playtime >= chapter.end) {
      return false
    }

    return true
  })(chapters)
)

export const inactiveChapter = chapter => ({
  ...chapter,
  active: false
})

export const activeChapter = chapter => ({
  ...chapter,
  active: true
})

export const setActiveByPlaytime = playtime => chapter => {
  if (playtime < chapter.start) {
    return inactiveChapter(chapter)
  }

  if (playtime >= chapter.end) {
    return inactiveChapter(chapter)
  }

  return activeChapter(chapter)
}

export const setActiveByIndex = chapterIndex => (chapter, index) =>
  chapterIndex === index ? activeChapter(chapter) : inactiveChapter(chapter)
