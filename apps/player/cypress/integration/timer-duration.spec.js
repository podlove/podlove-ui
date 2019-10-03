/* eslint-env mocha */
/* globals cy,expect */
const { onUpdate } = require('../helpers/state')

describe('<timer-duration>', () => {
  let dispatch, assert

  beforeEach(cy.setup)
  beforeEach(function () {
    cy.bootstrap('<timer-duration></timer-duration>', [this.theme, this.episode]).then(app => {
      dispatch = app.dispatch
      assert = onUpdate(app)
    })
  })

  describe('render', () => {
    it('should render the duration time', () => {
      cy.select('timer-duration').should('exist')
      cy.select('timer-duration').should('contain', '-00:12')
    })
  })

  describe('logic', () => {
    it('should update on playtime change', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('timer-duration').should('contain', '-00:11')
      })

      dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 1000 })
    })

    it('should update on ghosttime change', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('timer-duration').should('contain', '-00:11')
      })

      dispatch({ type: 'SIMULATE_PLAYTIME', payload: 1000 })
    })
  })
})
