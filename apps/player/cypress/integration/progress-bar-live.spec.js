/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<progress-bar-live>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    beforeEach(function() {
      cy.bootstrap('<progress-bar-live style="width: 200px;"></progress-bar-live>', [this.theme])
    })

    it('should render the progress bar', function() {
      cy.select('progress-bar-live').should('exist')
    })

    it('should set the progress range color', () => {
      cy.select('progress-bar-live')
        .find('.progress-range')
        .should('have.css', 'background-color', 'rgba(35, 89, 115, 0.3)')
    })

    it('should set the thumb color', () => {
      cy.select('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'background-color', 'rgb(35, 89, 115)')
      cy.select('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)')
    })

    it('should set the ghost thumb color', () => {
      cy.select('progress-bar-live')
        .find('.ghost-thumb')
        .should('have.css', 'background-color', 'rgba(35, 89, 115, 0.8)')
      cy.select('progress-bar-live')
        .find('.ghost-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)')
    })
  })

  describe('logic', () => {
    let assert, dispatch

    beforeEach(function() {
      cy.bootstrap('<progress-bar-live style="width: 200px;"></progress-bar-live>', [
        this.theme,
        this.episode,
        this.audio
      ]).then(app => {
        assert = onUpdate(app)
        dispatch = app.dispatch
        dispatch({ type: 'PLAYER_BACKEND_LIVESYNC', payload: 12000 })
      })
    })
    it('should set the thumb according to current playtime', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('progress-bar-live')
          .find('.progress-thumb')
          .should('have.css', 'left', '66.6562px')
      })

      cy.select('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'left', '0px')
        .then(() => {
          dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 4000 })
        })
    })
    it('should set the thumb to the right if playtime equals livesync', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('progress-bar-live')
          .find('.progress-thumb')
          .should('have.css', 'left', '200px')
      })

      cy.select('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'left', '0px')
        .then(() => {
          dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 12000 })
        })
    })
  })
})
