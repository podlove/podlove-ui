import { compose, prop } from 'ramda'
import { put, takeEvery, select } from 'redux-saga/effects'
import {
  transcriptsSaga,
  init,
  update,
  debouncedUpdate,
  search,
  resetToPlaytime
} from './transcripts'
import {
  READY,
  BACKEND_PLAYTIME,
  REQUEST_PLAYTIME,
  DISABLE_GHOST_MODE,
  SIMULATE_PLAYTIME,
  SEARCH_TRANSCRIPTS
} from '@podlove/player-actions/types'
import {
  setTranscriptsTimeline,
  updateTranscripts,
  setTranscriptsSearchResults
} from '@podlove/player-actions/transcripts'

const params = compose(prop('args'), prop('payload'))

describe('transcripts', () => {
  describe('transcriptsSaga()', () => {
    let factory
    let gen
    let selectSpeakers
    let selectChapters
    let selectPlaytime

    beforeEach(() => {
      selectSpeakers = jest.fn()
      selectChapters = jest.fn()
      selectPlaytime = jest.fn()
      factory = transcriptsSaga({ selectSpeakers, selectChapters, selectPlaytime })
      gen = factory()
    })

    test('should export a factory function', () => {
      expect(typeof factory).toBe('function')
    })

    test('should should create a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should register init on INIT', () => {
      expect(gen.next().value).toEqual(
        takeEvery(READY, init, { selectSpeakers, selectChapters, selectPlaytime })
      )
    })
  })

  describe('init()', () => {
    let gen, selectSpeakers, selectChapters, selectPlaytime

    const transcripts = [
      {
        start: '00:00:10',
        end: '00:00:15',
        speaker: '1',
        text: 'transcript 1 text'
      },
      {
        start: '00:00:20',
        end: '00:00:25',
        speaker: '2',
        text: 'transcript 2 text'
      },
      {
        start: '00:00:25',
        end: '00:00:30',
        speaker: '1',
        text: 'transcript 3 text'
      },
      {
        start: '00:00:30',
        end: '00:00:35',
        speaker: '2',
        text: 'transcript 4 text'
      }
    ]

    const speakers = [
      {
        id: '1',
        speaker: 'Carl',
        avatar: 'http://foo.bar/carl.jpg'
      },
      {
        id: '2',
        speaker: 'Peter',
        avatar: 'http://foo.bar/peter.jpg'
      }
    ]

    const chapters = [
      {
        start: 0,
        end: 2500,
        title: 'start'
      },
      {
        start: 35000,
        end: 36000,
        title: 'end'
      }
    ]

    beforeEach(() => {
      selectSpeakers = jest.fn()
      selectChapters = jest.fn()
      selectPlaytime = jest.fn()
      gen = init({ selectSpeakers, selectChapters, selectPlaytime }, { payload: { transcripts } })
    })

    test('should should create a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select speakers', () => {
      gen.next()
      expect(gen.next().value).toEqual(select(selectSpeakers))
    })

    test('should select chapters', () => {
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(select(selectChapters))
    })

    test('should create transcripts timeline', () => {
      gen.next()
      gen.next()
      gen.next(speakers)
      expect(gen.next(chapters).value).toEqual(
        put(
          setTranscriptsTimeline({
            timeline: [
              {
                end: 2500,
                index: 1,
                start: 0,
                title: 'start',
                type: 'chapter'
              },
              {
                end: 15000,
                speaker: {
                  avatar: 'http://foo.bar/carl.jpg',
                  id: '1',
                  speaker: 'Carl'
                },
                start: 10000,
                texts: [
                  {
                    end: 15000,
                    start: 10000,
                    text: 'transcript 1 text'
                  }
                ],
                type: 'transcript'
              },
              {
                end: 25000,
                speaker: {
                  avatar: 'http://foo.bar/peter.jpg',
                  id: '2',
                  speaker: 'Peter'
                },
                start: 20000,
                texts: [
                  {
                    end: 25000,
                    start: 20000,
                    text: 'transcript 2 text'
                  }
                ],
                type: 'transcript'
              },
              {
                end: 30000,
                speaker: {
                  avatar: 'http://foo.bar/carl.jpg',
                  id: '1',
                  speaker: 'Carl'
                },
                start: 25000,
                texts: [
                  {
                    end: 30000,
                    start: 25000,
                    text: 'transcript 3 text'
                  }
                ],
                type: 'transcript'
              },
              {
                end: 35000,
                speaker: {
                  avatar: 'http://foo.bar/peter.jpg',
                  id: '2',
                  speaker: 'Peter'
                },
                start: 30000,
                texts: [
                  {
                    end: 35000,
                    start: 30000,
                    text: 'transcript 4 text'
                  }
                ],
                type: 'transcript'
              },
              {
                end: 36000,
                index: 2,
                start: 35000,
                title: 'end',
                type: 'chapter'
              }
            ],
            hasTranscripts: true
          })
        )
      )
    })

    test('should register update on BACKEND_PLAYTIME', () => {
      gen.next()
      gen.next()
      gen.next(speakers)
      gen.next(chapters)

      const [type, func] = params(gen.next().value)
      expect(type).toEqual(BACKEND_PLAYTIME)
      expect(func).toEqual(update)
    })

    test('should register update on REQUEST_PLAYTIME', () => {
      gen.next()
      gen.next()
      gen.next(speakers)
      gen.next(chapters)
      gen.next()

      const [type, func] = params(gen.next().value)
      expect(type).toEqual(REQUEST_PLAYTIME)
      expect(func).toEqual(update)
    })

    test('should register debouncedUpdate on SIMULATE_PLAYTIME', () => {
      gen.next()
      gen.next()
      gen.next(speakers)
      gen.next(chapters)
      gen.next()
      gen.next()

      const [type, func] = params(gen.next().value)
      expect(type).toEqual(SIMULATE_PLAYTIME)
      expect(func).toEqual(debouncedUpdate)
    })

    test('should register debouncedUpdate on DISABLE_GHOST_MODE', () => {
      gen.next()
      gen.next()
      gen.next(speakers)
      gen.next(chapters)
      gen.next()
      gen.next()
      gen.next()

      const [type, func] = params(gen.next().value)
      expect(type).toEqual(DISABLE_GHOST_MODE)
      expect(func).toEqual(resetToPlaytime)
    })

    test('should register search on SEARCH_TRANSCRIPTS', () => {
      gen.next()
      gen.next()
      gen.next(speakers)
      gen.next(chapters)
      gen.next()
      gen.next()
      gen.next()
      gen.next()

      const [delay, type, func] = params(gen.next().value)
      expect(delay).toEqual(400)
      expect(type).toEqual(SEARCH_TRANSCRIPTS)
      expect(func).toEqual(search)
    })

    test('should complete the saga', () => {
      gen.next()
      gen.next()
      gen.next(speakers)
      gen.next(chapters)
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('update()', () => {
    let gen
    let search

    beforeEach(() => {
      search = jest.fn()
      gen = update(search, { payload: 'foo' })
    })

    test('should should create a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should call the search function with payload', () => {
      gen.next()
      expect(search).toHaveBeenCalledWith('foo')
    })

    test('should call UPDATE_TRANSCRIPTS with searchIndex', () => {
      search.mockReturnValue(10)
      expect(gen.next().value).toEqual(put(updateTranscripts(10)))
    })

    test('should not call UPDATE_TRANSCRIPTS when searchIndex returns falsy', () => {
      search.mockReturnValue(null)
      expect(gen.next().done).toBeTruthy()
    })

    test('should end the saga', () => {
      search.mockReturnValue(10)
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('debouncedUpdate()', () => {
    let gen
    let search

    beforeEach(() => {
      search = jest.fn()
      gen = debouncedUpdate(search, { payload: 'foo' })
    })

    test('should should create a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should call the search function with payload', () => {
      gen.next()
      expect(search).toHaveBeenCalledWith('foo')
    })

    test('should call UPDATE_TRANSCRIPTS with searchIndex', () => {
      search.mockReturnValue(10)
      gen.next()
      expect(gen.next().value).toEqual(put(updateTranscripts(10)))
    })

    test('should not call UPDATE_TRANSCRIPTS when searchIndex returns falsy', () => {
      search.mockReturnValue(null)
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })

    test('should end the saga', () => {
      search.mockReturnValue(10)
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('search()', () => {
    let gen
    let searchFn

    beforeEach(() => {
      searchFn = jest.fn()
      gen = search(searchFn, { payload: 'foo' })
    })

    test('should should create a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should call the search function with payload', () => {
      gen.next()
      expect(searchFn).toHaveBeenCalledWith('foo')
    })

    test('should call SET_SEARCH_TRANSCRIPTS_RESULTS with searchIndex', () => {
      searchFn.mockReturnValue(10)
      expect(gen.next().value).toEqual(put(setTranscriptsSearchResults(10)))
    })

    test('should call with empty array SET_SEARCH_TRANSCRIPTS_RESULTS ', () => {
      searchFn.mockReturnValue(null)
      expect(gen.next().value).toEqual(put(setTranscriptsSearchResults([])))
    })

    test('should end the saga', () => {
      searchFn.mockReturnValue(10)
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })
})
