import { UPDATE_CHAPTER, SET_CHAPTERS_LIST, SET_CHAPTER } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './chapters'

const chapter1 = {
  start: 0,
  end: 99,
  title: 'chapter 1',
  href: '',
  image: ''
}
const chapter2 = {
  start: 100,
  end: 199,
  title: 'chapter 2',
  href: '',
  image: ''
}
const chapter3 = {
  start: 200,
  end: 299,
  title: 'chapter 3',
  href: '',
  image: ''
}
const chapter4 = {
  start: 300,
  end: 399,
  title: 'chapter 4',
  href: '',
  image: ''
}
const chapter5 = {
  start: 400,
  end: 499,
  title: 'chapter 5',
  href: '',
  image: ''
}

describe('chapters', () => {
  test('should set the chapter list on SET_CHAPTERS_LIST', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SET_CHAPTERS_LIST,
        payload: [chapter1, chapter2, chapter3, chapter4, chapter5]
      })
    ).toEqual({
      ...INITIAL_STATE,
      current: {
        ...chapter1,
        active: true
      },
      next: chapter2,
      previous: {
        end: null,
        href: null,
        index: -1,
        start: null,
        title: null
      },
      list: [
        {
          ...chapter1,
          active: true
        },
        chapter2,
        chapter3,
        chapter4,
        chapter5
      ]
    })
  })

  test('should set the chapter by index on SET_CHAPTER', () => {
    const state = reducer(INITIAL_STATE, {
      type: SET_CHAPTERS_LIST,
      payload: [chapter1, chapter2, chapter3, chapter4, chapter5]
    })

    expect(
      reducer(state, {
        type: SET_CHAPTER,
        payload: 2
      })
    ).toEqual({
      ...state,
      previous: {
        ...chapter2,
        active: false
      },
      current: {
        ...chapter3,
        active: true
      },
      next: {
        ...chapter4,
        active: false
      },
      list: [
        {
          ...chapter1,
          active: false
        },
        {
          ...chapter2,
          active: false
        },
        {
          ...chapter3,
          active: true
        },
        {
          ...chapter4,
          active: false
        },
        {
          ...chapter5,
          active: false
        }
      ]
    })
  })

  test('should set the chapter by index on UPDATE_CHAPTER', () => {
    const state = reducer(INITIAL_STATE, {
      type: SET_CHAPTERS_LIST,
      payload: [chapter1, chapter2, chapter3, chapter4, chapter5]
    })

    expect(
      reducer(state, {
        type: UPDATE_CHAPTER,
        payload: 200
      })
    ).toEqual({
      ...state,
      previous: {
        ...chapter2,
        active: false
      },
      current: {
        ...chapter3,
        active: true
      },
      next: {
        ...chapter4,
        active: false
      },
      list: [
        {
          ...chapter1,
          active: false
        },
        {
          ...chapter2,
          active: false
        },
        {
          ...chapter3,
          active: true
        },
        {
          ...chapter4,
          active: false
        },
        {
          ...chapter5,
          active: false
        }
      ]
    })
  })
})
