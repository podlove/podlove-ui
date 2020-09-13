/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<tab-transcripts>', () => {
  let assert, dispatch

  beforeEach(cy.setup)
  beforeEach(function() {
    cy.bootstrap('<tab-transcripts></tab-transcripts>', [
      this.theme,
      this.chapters,
      this.transcripts
    ]).then(app => {
      assert = onUpdate(app)
      dispatch = app.dispatch
    })
  })

  describe('render', () => {
    beforeEach(() => {
      dispatch({ type: 'PLAYER_SEARCH_TRANSCRIPTS', payload: 'lorem' })
    })
    describe('title', () => {
      it('should render the tab title', () => {
        cy.select('tab-title').should('exist')
        cy.select('tab-title').should('contain', 'Transcript')
      })
    })

    describe('search', () => {
      it('should render the search input', () => {
        cy.select('tab-transcripts--search').should('exist')
        cy.select('tab-transcripts--search').should('have.value', 'lorem')
      })

      it('should render the search controls', () => {
        cy.select('tab-transcripts--search-controls').should('exist')
        cy.select('tab-transcripts--search-controls--previous').should('exist')
        cy.select('tab-transcripts--search-controls--next').should('exist')
      })
    })

    describe('follow', () => {
      it('should render the follow button', () => {
        cy.select('tab-transcripts--follow').should('exist')
      })
    })

    describe('transcripts', () => {
      it('should render the transcripts', done => {
        assert('PLAYER_SEARCH_TRANSCRIPTS', () => {
          cy.select('tab-transcripts--entry').should('have.length', 5)
          done()
        })

        dispatch({ type: 'PLAYER_SEARCH_TRANSCRIPTS', payload: 'lorem' })
      })
    })
  })

  describe('logic', () => {
    describe('title', () => {
      it('should trigger the toggle tab action on close', () => {
        assert('PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('transcripts')
        })

        cy.select('tab-title--close').click()
      })
    })

    describe('search', () => {
      describe('controls', () => {
        beforeEach(() => {
          dispatch({ type: 'PLAYER_SEARCH_TRANSCRIPTS', payload: 'lorem' })
        })

        it('should show the search results', () => {
          cy.select('tab-transcripts--search-controls').should('exist')
          cy.select('tab-transcripts--search-controls--current-result').should('contain', '1')
          cy.select('tab-transcripts--search-controls--total-result').should('contain', '6')
        })

        it('should jump to the next search result if clicked', done => {
          assert('PLAYER_NEXT_SEARCH_RESULT', () => {
            done()
          })

          cy.select('tab-transcripts--search-controls--next').click()
        })

        it('should jump to the previous search result if clicked', done => {
          assert('PLAYER_PREVIOUS_SEARCH_RESULT', () => {
            done()
          })
          cy.select('tab-transcripts--search-controls--next').click()
          cy.select('tab-transcripts--search-controls--previous').click()
        })

        it('should show a message when no results are available', () => {
          assert('PLAYER_SEARCH_TRANSCRIPTS', () => {
            cy.select('tab-transcripts--search-controls--no-results').should('exist')
          })
          dispatch({ type: 'PLAYER_SEARCH_TRANSCRIPTS', payload: 'not in the transcript' })
        })
      })

      describe('results', () => {
        it('should highlight all results', done => {
          assert('PLAYER_SEARCH_TRANSCRIPTS', () => {
            cy.select('tab-transcripts--results')
              .find('span[style*="background: rgb(128, 126, 124)"]')
              .should('have.length', 6)
            done()
          })

          dispatch({ type: 'PLAYER_SEARCH_TRANSCRIPTS', payload: 'lorem' })
        })
      })
    })

    describe('follow', () => {
      it('should disable follow on click', done => {
        assert('PLAYER_TOGGLE_FOLLOW_TRANSCRIPTS', (_, { payload }) => {
          expect(payload).to.equal(false)
          done()
        })

        cy.select('tab-transcripts--follow').click()
      })

      it('should enable follow on click', done => {
        dispatch({ type: 'PLAYER_TOGGLE_FOLLOW_TRANSCRIPTS', payload: false })
        assert('PLAYER_TOGGLE_FOLLOW_TRANSCRIPTS', (_, { payload }) => {
          expect(payload).to.equal(true)
          done()
        })

        cy.select('tab-transcripts--follow').click()
      })
    })
  })
})
