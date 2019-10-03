/* eslint-env mocha */
/* globals cy */

const { onUpdate } = require('../helpers/state')

describe('<chapter-next>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should not render when chapters are not available', function () {
      cy.bootstrap('<chapter-next></chapter-next>').then(() => {
        cy.select('chapter-next').should('not.exist')
      })
    })

    it('should render when chapters are available', function () {
      cy.bootstrap('<chapter-next></chapter-next>', [this.chapters]).then(() => {
        cy.select('chapter-next').should('exist')
      })
    })
  })

  describe('logic', () => {
    let assert, store

    beforeEach(function () {
      cy.bootstrap('<chapter-next></chapter-next>', [this.chapters]).then(app => {
        expect(app.getState().chapters.current.index).to.equal(1)
        cy.select('chapter-next').should('exist')
        assert = onUpdate(app)
        store = app
      })
    })

    it('should jump to the next chapter on click', function (done) {
      assert('PLAYER_SET_CHAPTER', state => {
        expect(state.chapters.current.index).to.equal(2)
        done()
      })

      cy.select('chapter-next').click()
    })

    it('should be disabled on last chapter', function (done) {
      assert('PLAYER_SET_CHAPTER', () => {
        cy.select('chapter-next').should('be.disabled')
        done()
      })

      store.dispatch({
        type: 'PLAYER_SET_CHAPTER',
        payload: 3
      })
    })
  })
})
