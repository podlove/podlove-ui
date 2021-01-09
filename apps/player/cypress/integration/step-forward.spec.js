/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')
describe('<step-forward>', () => {
  let assert, dispatch

  beforeEach(cy.setup)
  beforeEach(function() {
    cy.bootstrap('<step-forward></step-forward>', [this.theme, this.episode]).then(app => {
      assert = onUpdate(app)
      dispatch = app.dispatch
    })
  })

  describe('render', () => {
    it('should render', () => {
      cy.select('step-forward').should('exist')
    })
  })

  describe('logic', () => {
    it('should be enabled more than 30 seconds are left', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('step-forward').should('not.be.disabled')
      })

      dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 0 })
    })

    it('should jump 30 seconds forward', function() {
      cy.bootstrap('<step-forward></step-forward>', [
        this.theme,
        { playtime: 0, duration: 60000 }
      ]).then(app => {
        onUpdate(app, 'PLAYER_REQUEST_PLAYTIME', (_, { payload }) => {
          expect(payload).to.equal(30000)
        })
        cy.select('step-forward').click()
      })
    })
  })
})
