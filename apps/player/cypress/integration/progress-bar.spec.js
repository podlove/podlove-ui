/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<progress-bar>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    beforeEach(function () {
      cy.bootstrap('<progress-bar style="width: 200px;"></progress-bar>', [this.theme])
    })

    it('should render the progress bar', function () {
      cy.select('progress-bar').should('exist')
    })

    it('should set the progress range color', () => {
      cy.select('progress-bar')
        .find('.progress-range')
        .should('have.css', 'background-color', 'rgba(35, 89, 115, 0.3)')
    })

    it('should set the thumb color', () => {
      cy.select('progress-bar')
        .find('.progress-thumb')
        .should('have.css', 'background-color', 'rgb(35, 89, 115)')
      cy.select('progress-bar')
        .find('.progress-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)')
    })

    it('should set the ghost thumb color', () => {
      cy.select('progress-bar')
        .find('.ghost-thumb')
        .should('have.css', 'background-color', 'rgba(35, 89, 115, 0.8)')
      cy.select('progress-bar')
        .find('.ghost-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)')
    })
  })

  describe('logic', () => {
    let assert, dispatch

    beforeEach(function () {
      cy.bootstrap('<progress-bar style="width: 200px;"></progress-bar>', [
        this.theme,
        this.episode,
        this.audio,
        this.chapters
      ]).then((app) => {
        assert = onUpdate(app)
        dispatch = app.dispatch
      })
    })

    it('should render the chapters', () => {
      cy.select('progress-bar--chapter-progress--indicator').should('have.length', 3)
    })

    it('should set the thumb according to current playtime', () => {
      assert('PLAYER_REQUEST_PLAYTIME', () => {
        cy.select('progress-bar').find('.progress-thumb').should('have.css', 'left', '66.6562px')
      })

      cy.select('progress-bar')
        .find('.progress-thumb')
        .should('have.css', 'left', '0px')
        .then(() => {
          dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 4000 })
        })
    })
  })
})
