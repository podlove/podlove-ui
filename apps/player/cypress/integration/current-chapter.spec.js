/* eslint-env mocha */
/* globals cy */

const { onUpdate } = require('../helpers/state')

describe('<current-chapter>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should not render the show title when chapters are not available', function () {
      cy.bootstrap('<current-chapter></current-chapter>').then(() => {
        cy.select('current-chapter').should('not.exist')
      })
    })

    it('should render the show title when chapters are available', function () {
      cy.bootstrap('<current-chapter></current-chapter>', [this.chapters]).then(() => {
        cy.select('current-chapter').should('exist')
      })
    })
  })

  describe('logic', () => {
    it('should show the current chapter title', function () {
      cy.bootstrap('<current-chapter></current-chapter>', [this.chapters]).then(() => {
        cy.select('current-chapter').should('contain', `I'm a thing`)
      })
    })

    it('should show the chapter last chapter', function (done) {
      cy.bootstrap('<current-chapter></current-chapter>', [this.chapters]).then((app) => {
        onUpdate(app, 'PLAYER_SET_CHAPTER', () => {
          cy.select('current-chapter').should('contain', `I'm a thing`)
          done()
        })

        app.dispatch({
          type: 'PLAYER_SET_CHAPTER',
          payload: 3
        })
      })
    })
  })
})
