/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<timer-live>', () => {
  let dispatch, assert

  beforeEach(cy.setup)
  beforeEach(function () {
    cy.bootstrap('<timer-live></timer-live>', [this.theme, this.episode]).then((app) => {
      dispatch = app.dispatch
      assert = onUpdate(app)
    })
  })

  describe('render', () => {
    it('should render the live label', () => {
      dispatch({
        type: 'PLAYER_BACKEND_LIVESYNC',
        payload: 10000
      })
      dispatch({
        type: 'PLAYER_BACKEND_PLAYTIME',
        payload: 10000
      })
      cy.select('label-live').should('exist')
    })

    it('should render the live timer', () => {
      dispatch({
        type: 'PLAYER_BACKEND_LIVESYNC',
        payload: 10000
      })
      dispatch({
        type: 'PLAYER_BACKEND_PLAYTIME',
        payload: 4000
      })
      cy.select('timer-live').should('exist')
    })
  })

  describe('logic', () => {
    it('should show the timer if the livesync is less than 5 seconds away', () => {
      dispatch({
        type: 'PLAYER_BACKEND_LIVESYNC',
        payload: 10000
      })
      dispatch({
        type: 'PLAYER_BACKEND_PLAYTIME',
        payload: 4000
      })
      cy.select('timer-live').should('exist')
      cy.select('timer-live').should('contain', '-00:06')
    })

    it('should update on ghosttime change', () => {
      dispatch({
        type: 'PLAYER_BACKEND_LIVESYNC',
        payload: 10000
      })
      dispatch({
        type: 'PLAYER_SIMULATE_PLAYTIME',
        payload: 1000
      })
      cy.select('timer-live').should('exist')
      cy.select('timer-live').should('contain', '-00:10')
    })
  })
})
