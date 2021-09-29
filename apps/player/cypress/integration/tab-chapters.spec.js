/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')
const { select } = require('../helpers/selectors')

describe('<tab-chapters>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    describe('title', () => {
      it('should render the tab title', () => {
        cy.bootstrap('<tab-chapters style="width: 400px;"></tab-chapters>', [this.theme])
        cy.select('tab-title').should('exist')
        cy.select('tab-title').should('contain', 'Chapters')
      })
    })

    describe('list', () => {
      it(`shouldn't render entries if no chapters are available`, function () {
        cy.bootstrap('<tab-chapters style="width: 400px;"></tab-chapters>', [this.theme])
        cy.select('tab-chapters--entry').should('have.length', 0)
      })

      it(`should render entries if chapters are available`, function () {
        cy.bootstrap('<tab-chapters style="width: 400px;"></tab-chapters>', [
          this.theme,
          this.chapters
        ])
        cy.select('tab-chapters--entry').should('have.length', this.chapters.chapters.length)
      })

      it(`should render the entries in the right order`, function () {
        cy.bootstrap('<tab-chapters style="width: 400px;"></tab-chapters>', [
          this.theme,
          this.chapters
        ])
        cy.select('tab-chapters--entry').then((nodes) => {
          this.chapters.chapters.forEach((chapter, index) => {
            expect(nodes.get(index).textContent).to.contain(chapter.title)
          })
        })
      })
    })
  })

  describe('logic', () => {
    let assert, dispatch

    beforeEach(function () {
      cy.bootstrap('<tab-chapters style="width: 400px;"></tab-chapters>', [
        this.theme,
        this.chapters
      ]).then((app) => {
        assert = onUpdate(app)
        dispatch = app.dispatch
      })
    })

    describe('title', () => {
      it('should trigger the toggle tab action on close', (done) => {
        assert('PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('chapters')
          done()
        })

        cy.select('tab-title--close').click()
      })
    })

    describe('list', () => {
      describe('interactions', () => {
        it('should render a play icon on the active chapter', () => {
          cy.select('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-play'))
            .should('exist')
          cy.select('tab-chapters--entry').eq(1).find(select('tab-chapters--index')).should('exist')
          cy.select('tab-chapters--entry').eq(2).find(select('tab-chapters--index')).should('exist')
        })

        it('should render a pause icon on the active chapter', () => {
          assert('PLAYER_REQUEST_PLAY', () => {
            cy.select('tab-chapters--entry')
              .eq(0)
              .find(select('tab-chapters--trigger--menu-pause'))
              .should('exist')
          })

          dispatch({ type: 'PLAYER_REQUEST_PLAY' })
        })

        it('should dispatch the REQUEST_PLAY action on click', (done) => {
          assert('PLAYER_REQUEST_PLAY', () => done())

          cy.select('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-play'))
            .click()
        })

        it('should dispatch the REQUEST_PAUSE action on click', (done) => {
          assert('PLAYER_REQUEST_PAUSE', () => done())

          cy.select('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-play'))
            .click()
          cy.select('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-pause'))
            .click()
        })

        it('starts the playback on chapter start time', (done) => {
          assert('PLAYER_REQUEST_PLAY', (state) => {
            expect(state.timepiece.playtime).to.equal(6000)
            done()
          })

          cy.select('tab-chapters--entry').eq(1).trigger('mouseover')
          cy.select('tab-chapters--entry')
            .eq(1)
            .find(select('tab-chapters--trigger--menu-play'))
            .click()
        })

        it('should display the link if available', function () {
          cy.select('tab-chapters--entry')
            .eq(2)
            .find('a')
            .should('have.attr', 'href', this.chapters.chapters[2].href)
        })

        it('should show the link icon on interaction', function () {
          cy.select('tab-chapters--entry').eq(2).find('a').trigger('mouseover')
          cy.select('tab-chapters--entry')
            .eq(2)
            .select('tab-chapters--trigger--link')
            .should('exist')
        })
      })

      describe('timers', () => {
        it('should show the remaining time on the active chapter', () => {
          assert('PLAYER_REQUEST_PAYTIME', () => {
            cy.select('tab-chapters--entry').eq(0).find('.timer').should('contain', '-00:05')
          })

          dispatch({ type: 'SIMULATE_PLAYTIME', payload: 1000 })
        })

        it('should show the remaining time on the inactive chapter', () => {
          cy.select('tab-chapters--entry').eq(1).find('.timer').should('contain', '00:02')
        })
      })
    })
  })
})
