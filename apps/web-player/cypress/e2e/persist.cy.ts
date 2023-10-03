import { onUpdate } from '../helpers/state';
import storage from '../helpers/storage';

describe('persist', () => {
  let assert, store
  beforeEach(cy.setup)
  beforeEach(() => {
    cy.embed('<div></div>', { episode: '/podcast/episode.json', config: '/podcast/config.json' }).then(
      ({ player }) => {
        assert = onUpdate(player.store)
        store = player.store
      }
    )
  })

  describe('playtime', () => {
    it('should persist the playtime', (done) => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        // throttled time
        cy.wait(1000)

        storage.getItem('playtime').then((val) => {
          expect(val).to.equal(60000)
          done()
        })
      })

      store.dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 60000 })
    })

    it('should restore the persisted playtime', () => {
      store.dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 60000 })

      // throttled time
      cy.wait(1000)

      cy.embed('<div></div>', { episode: '/podcast/episode.json', config: '/podcast/config.json' }).then(
        ({ player }) => {
          expect(player.store.getState().timepiece.playtime).to.equal(60000)
        }
      )
    })
  })

  describe('tabs', () => {
    const tabs = ['files', 'playlist', 'chapters', 'transcripts', 'share']

    tabs.forEach((tab) => {
      it(`should persist on ${tab} tab change`, (done) => {
        assert('PLAYER_TOGGLE_TAB', () => {
          // throttled time
          cy.wait(1000)

          storage.getItem('tabs').then((val) => {
            expect(val[tab]).to.equal(true)
            done()
          })
        })

        store.dispatch({ type: 'PLAYER_TOGGLE_TAB', payload: tab })
      })

      it(`should restore the persisted ${tab} tab`, () => {
        store.dispatch({ type: 'PLAYER_TOGGLE_TAB', payload: tab })
        // throttled time
        cy.wait(1000)

        cy.embed('<div></div>', { episode: '/podcast/episode.json', config: '/podcast/config.json' }).then(
          ({ player }) => {
            expect(player.store.getState().tabs[tab]).to.equal(true)
          }
        )
      })
    })
  })

  describe('quantiles', () => {
    it('should persist the quantiles', (done) => {
      assert('PLAYER_LOAD_QUANTILES', () => {
        // throttled time
        cy.wait(1000)

        storage.getItem('quantiles').then((val) => {
          expect(val).to.deep.equal([
            [0, 10],
            [100, 200]
          ])
          done()
        })
      })

      store.dispatch({
        type: 'PLAYER_LOAD_QUANTILES',
        payload: [
          [0, 10],
          [100, 200]
        ]
      })
    })

    it('should restore the persisted playtime', () => {
      store.dispatch({
        type: 'PLAYER_LOAD_QUANTILES',
        payload: [
          [0, 10],
          [100, 200]
        ]
      })

      // throttled time
      cy.wait(1000)

      cy.embed('<div></div>', { episode: '/podcast/episode.json', config: '/podcast/config.json' }).then(
        ({ player }) => {
          expect(player.store.getState().quantiles).to.deep.equal([
            [0, 10],
            [100, 200]
          ])
        }
      )
    })
  })
})
