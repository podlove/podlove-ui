/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<error>', () => {
  let assert, dispatch

  beforeEach(cy.setup)
  beforeEach(function () {
    cy.bootstrap('<error></error>', [this.audio]).then((store) => {
      dispatch = store.dispatch
      assert = onUpdate(store)
    })
  })

  describe('render', () => {
    it('should not render when no error is available', function () {
      cy.select('error').should('not.exist')
    })

    it('should not render when an error is available', () => {
      assert('PLAYER_SHOW_ERROR', () => {
        cy.select('error').should('exist')
      })

      dispatch({
        type: 'PLAYER_SHOW_ERROR',
        payload: {
          title: 'Error Title',
          message: 'Error Message',
          retry: () => {}
        }
      })
    })

    it('should set the background color', () => {
      assert('PLAYER_SHOW_ERROR', () => {
        cy.select('error').should('have.css', 'background-color', 'rgb(233, 241, 245)')
      })

      dispatch({
        type: 'PLAYER_SHOW_ERROR',
        payload: {
          title: 'Error Title',
          message: 'Error Message',
          retry: () => {}
        }
      })
    })
  })

  describe('logic', () => {
    it('should render the title when available', () => {
      assert('PLAYER_SHOW_ERROR', () => {
        cy.select('error--title').should('exist')
        cy.select('error--message').should('not.exist')
        cy.select('error--retry').should('not.exist')
      })

      dispatch({
        type: 'PLAYER_SHOW_ERROR',
        payload: {
          title: 'Error Title'
        }
      })
    })

    it('should render the title when available', () => {
      assert('PLAYER_SHOW_ERROR', () => {
        cy.select('error--title').should('not.exist')
        cy.select('error--message').should('exist')
        cy.select('error--retry').should('not.exist')
      })

      dispatch({
        type: 'PLAYER_SHOW_ERROR',
        payload: {
          message: 'Error Message'
        }
      })
    })

    it('should render the retry button when available', () => {
      assert('PLAYER_SHOW_ERROR', () => {
        cy.select('error--title').should('not.exist')
        cy.select('error--message').should('not.exist')
        cy.select('error--retry').should('exist')
      })

      dispatch({
        type: 'PLAYER_SHOW_ERROR',
        payload: {
          retry: () => {}
        }
      })
    })
  })
})
