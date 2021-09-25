/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')
const { select } = require('../helpers/selectors')

describe('<tab-playlist>', () => {
  beforeEach(cy.setup)
  beforeEach(() => {
    cy.server()
    cy.route('GET', '/episode.json', 'fixture:episode.json')
  })

  describe('render', () => {
    describe('title', () => {
      it('should render the tab title', function () {
        cy.bootstrap('<tab-playlist style="width: 400px;"></tab-playlist>', [
          this.theme,
          this.playlist
        ])
        cy.select('tab-title').should('exist')
        cy.select('tab-title').should('contain', 'Related Episodes')
      })
    })

    describe('list', () => {
      it(`shouldn't render entries if no playlists are available`, function () {
        cy.bootstrap('<tab-playlist style="width: 400px;"></tab-playlist>', [this.theme])
        cy.select('tab-playlist--entry').should('have.length', 0)
      })

      it(`should render entries if playlists are available`, function () {
        cy.bootstrap('<tab-playlist style="width: 400px;"></tab-playlist>', [
          this.theme,
          this.playlist
        ])
        cy.select('tab-playlist--entry').should('have.length', this.playlist.playlist.length)
      })

      it(`should render the entries in the right order`, function () {
        cy.bootstrap('<tab-playlist style="width: 400px;"></tab-playlist>', [
          this.theme,
          this.playlist
        ])
        cy.select('tab-playlist--entry--title').then((nodes) => {
          this.playlist.playlist.forEach((entry, index) => {
            expect(nodes.get(index).textContent).to.contain(entry.title)
          })
        })
      })
    })
  })

  describe('logic', () => {
    let assert, dispatch

    beforeEach(function () {
      cy.bootstrap('<tab-playlist style="width: 400px;"></tab-playlist>', [
        this.theme,
        this.playlist
      ]).then((app) => {
        assert = onUpdate(app)
        dispatch = app.dispatch
      })
    })

    describe('title', () => {
      it('should trigger the toggle tab action on close', (done) => {
        assert('PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('playlist')
          done()
        })

        cy.select('tab-title--close').click()
      })
    })

    describe('list', () => {
      it('should mark the current episode as active', function () {
        cy.select('tab-playlist--entry--active').should('not.exist')

        assert('PLAYER_SELECT_PLAYLIST_ENTRY', () => {
          cy.select('tab-playlist--entry--active').should('exist')
          cy.select('tab-playlist--entry--active')
            .find(select('tab-playlist--entry--title'))
            .should('contain', this.playlist.playlist[0].title)
        })

        dispatch({ type: 'PLAYER_SELECT_PLAYLIST_ENTRY', payload: { index: 0 } })
      })

      it('should dispatch the action to select and play an episode', (done) => {
        assert('PLAYER_SELECT_PLAYLIST_ENTRY', (_, { payload: { index: index } }) => {
          expect(index).to.equal(1)
          done()
        })

        cy.select('tab-playlist--entry--interaction').eq(1).click()
      })

      it('should dispatch the action to play the current episode', (done) => {
        assert('PLAYER_REQUEST_PLAY', () => {
          done()
        })
        dispatch({ type: 'PLAYER_SELECT_PLAYLIST_ENTRY', payload: { index: 1 } })
        cy.select('tab-playlist--entry--interaction').eq(1).click()
      })

      it('should dispatch the action to pause the current episode', (done) => {
        assert('PLAYER_REQUEST_PAUSE', () => {
          done()
        })

        cy.select('tab-playlist--entry--interaction').eq(1).click()
        cy.select('tab-playlist--entry--interaction').eq(1).click()
      })
    })
  })
})
