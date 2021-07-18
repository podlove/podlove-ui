/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<timer-current>', () => {
  let dispatch, assert

  beforeEach(cy.setup)
  beforeEach(function () {
    cy.bootstrap('<timer-current></timer-current>', [this.theme]).then((app) => {
      dispatch = app.dispatch
      assert = onUpdate(app)
    })
  })

  describe('render', () => {
    it('should render the current time', () => {
      cy.select('timer-current').should('exist')
      cy.select('timer-current').should('contain', '00:00')
    })
  })

  describe('logic', () => {
    it('should update on playtime change', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('timer-current').should('contain', '01:00')
      })

      dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 60000 })
    })
  })
})
