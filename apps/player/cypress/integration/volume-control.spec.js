/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<volume-control>', () => {
  let dispatch, assert

  beforeEach(cy.setup)
  beforeEach(function() {
    cy.bootstrap('<volume-control></volume-control>', [this.theme]).then(app => {
      dispatch = app.dispatch
      assert = onUpdate(app)
    })
  })

  describe('render', () => {
    it('should render the volume control', () => {
      cy.select('volume-control').should('exist')
    })

    it('should render the volume slider', () => {
      cy.select('volume-control').click()
      cy.select('volume-control--slider').should('exist')
    })
  })

  describe('logic', () => {
    it('should reflect the volume on input', () => {
      assert('PLAYER_SET_VOLUME', () => {
        cy.select('volume-control--slider')
          .find('input')
          .should('have.value', '0.5')
      })

      cy.select('volume-control').click()
      dispatch({ type: 'PLAYER_SET_VOLUME', payload: 0.5 })
    })
  })
})
