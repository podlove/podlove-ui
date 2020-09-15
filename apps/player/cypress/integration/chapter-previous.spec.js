/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<chapter-previous>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should not render when chapters are not available', function() {
      cy.bootstrap('<chapter-previous></chapter-previous>').then(() => {
        cy.select('chapter-previous').should('not.exist')
      })
    })

    it('should render when chapters are available', function() {
      cy.bootstrap('<chapter-previous></chapter-previous>', [this.chapters]).then(() => {
        cy.select('chapter-previous').should('exist')
      })
    })
  })

  describe('logic', () => {
    let assert, store

    beforeEach(function() {
      cy.bootstrap('<chapter-previous></chapter-previous>', [this.chapters]).then(app => {
        expect(app.getState().chapters.current.index).to.equal(1)
        cy.select('chapter-previous').should('exist')
        app.dispatch({
          type: 'PLAYER_SET_CHAPTER',
          payload: 2
        })
        assert = onUpdate(app)
        store = app
      })
    })

    it('should jump to the next chapter on click', function(done) {
      assert('PLAYER_SET_CHAPTER', state => {
        expect(state.chapters.current.index).to.equal(2)
        done()
      })

      cy.select('chapter-previous').click()
    })

    it('should be disabled on first chapter', function() {
      store.dispatch({
        type: 'PLAYER_SET_CHAPTER',
        payload: 0
      })

      cy.select('chapter-previous').should('be.disabled')
    })
  })
})
