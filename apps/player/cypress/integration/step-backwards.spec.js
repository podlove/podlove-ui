/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')
describe('<step-backward>', () => {
  let assert, dispatch

  beforeEach(cy.setup)
  beforeEach(function() {
    cy.bootstrap('<step-backward></step-backward>', [this.theme]).then(app => {
      assert = onUpdate(app)
      dispatch = app.dispatch
    })
  })

  describe('render', () => {
    it('should render', () => {
      cy.select('step-backward').should('exist')
    })
  })

  describe('logic', () => {
    it('should be disabled if less than 15 seconds are played', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('step-backward').should('be.disabled')
      })

      dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 0 })
    })

    it('should be enabled more than 15 seconds are played', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('step-backward').should('not.be.disabled')
      })

      dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 15000 })
    })

    it('should jump 15 seconds back', done => {
      cy.bootstrap('<step-backward></step-backward>', [this.theme, { playtime: 15000 }]).then(
        app => {
          onUpdate(app, 'PLAYER_REQUEST_PLAYTIME', (_, { payload }) => {
            expect(payload).to.equal(0)
            done()
          })
          cy.select('step-backward').click()
        }
      )
    })
  })
})
