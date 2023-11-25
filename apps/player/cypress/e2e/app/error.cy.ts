import { showError } from '@podlove/player-actions/error';
import audio from '../../fixtures/audio.json';
import { onUpdate } from '../../helpers/state.js';

describe('<error>', () => {
  let assert, dispatch

  beforeEach(() => {
    cy.app('<error style="--podlove-player--error--background: rgb(233, 241, 245)"></error>', [audio]).then((store) => {
      dispatch = store.dispatch
      assert = onUpdate(store)
    })
  })

  describe('render', () => {
    it('should not render when no error is available', () => {
      cy.query('error').should('not.exist')
    })

    it('should not render when an error is available', () => {
      assert(showError.toString(), () => {
        cy.query('error').should('exist')
      })

      dispatch(showError({
        title: 'Error Title',
        message: 'Error Message',
        retry: true
      }))
    })

    it('should set the background color', () => {
      assert(showError.toString(), () => {
        cy.query('error').should('have.css', 'background-color', 'rgb(233, 241, 245)')
      })

      dispatch(showError({
        title: 'Error Title',
        message: 'Error Message',
        retry: true
      }))
    })
  })

  describe('logic', () => {
    it('should render the title when available', () => {
      assert(showError.toString(), () => {
        cy.query('error--title').should('exist')
        cy.query('error--message').should('not.exist')
        cy.query('error--retry').should('not.exist')
      })

      dispatch(showError({
        title: 'Error Title'
      }))
    })

    it('should render the message when available', () => {
      assert(showError.toString(), () => {
        cy.query('error--title').should('not.exist')
        cy.query('error--message').should('exist')
        cy.query('error--retry').should('not.exist')
      })

      dispatch(showError({
        message: 'Error Message'
      }))
    })

    it('should render the retry button when available', () => {
      assert(showError.toString(), () => {
        cy.query('error--title').should('not.exist')
        cy.query('error--message').should('not.exist')
        cy.query('error--retry').should('exist')
      })

      dispatch(showError({
        retry: true
      }))
    })
  })
})
