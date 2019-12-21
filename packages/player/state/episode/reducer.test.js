import { READY } from '@podlove/player-actions/types'
import { reducer as episode } from './reducer'

describe('episode', () => {
  let testAction

  beforeEach(() => {
    testAction = {
      type: READY,
      payload: {
        title: 'title',
        subtitle: 'subtitle',
        poster: '//episode/poster',
        summary:
          'Die muntere Talk Show um Leben mit Technik, das Netz und Technikkultur. Bisweilen Apple-lastig aber selten einseitig. Wir leben und lieben Technologie und reden darüber. Mit Tim, hukl, roddi, Clemens und Denis. Freak Show hieß irgendwann mal mobileMacs.',
        link: 'https://freakshow.fm/fs171-invasion',
        publicationDate: '2016-02-11T03:13:55+00:00'
      }
    }
  })

  test(`episode: it is a reducer function`, () => {
    expect(typeof episode).toBe('function')
  })

  test(`episode: it extracts the episode meta information`, () => {
    const result = episode({}, testAction)

    testAction.payload.publicationDate = new Date('2016-02-11T03:13:55+00:00').getTime()

    expect(result).toEqual(testAction.payload)
  })

  test(`episode: it falls back to default state`, () => {
    const result = episode(undefined, { type: READY })
    expect(result).toEqual({
      title: null,
      subtitle: null,
      poster: null,
      summary: null,
      link: null,
      publicationDate: null
    })
  })

  test(`episode: it does nothing if not the init action is dispatched`, () => {
    const result = episode('foobar', {
      type: 'NOT_A_REAL_TYPE'
    })
    expect(result).toBe('foobar')
  })
})
