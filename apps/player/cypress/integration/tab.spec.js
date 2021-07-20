/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')
describe('<tab>', () => {
  let assert, dispatch

  beforeEach(cy.setup)
  beforeEach(function () {
    cy.bootstrap('<tab name="shownotes"><div>My Tab Content</div></tab>', [this.theme]).then(
      (app) => {
        assert = onUpdate(app)
        dispatch = app.dispatch
      }
    )
  })

  describe('render', () => {
    it('should render when active', () => {
      assert('PLAYER_TOGGLE_TAB', () => {
        cy.select('tab').should('exist')
      })

      dispatch({ type: 'PLAYER_TOGGLE_TAB', payload: 'shownotes' })
    })

    it('should not render when active', () => {
      assert('PLAYER_TOGGLE_TAB', () => {
        cy.select('tab').should('not.exist')
      })

      dispatch({ type: 'PLAYER_TOGGLE_TAB', payload: 'other-tab' })
    })
  })
})
