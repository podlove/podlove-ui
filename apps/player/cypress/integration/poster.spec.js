/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<poster>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render when a poster is available', function() {
      cy.bootstrap('<poster></poster>', [this.episode, this.show]).then(() => {
        cy.select('poster')
          .find('img')
          .should('exist')
      })
    })

    it('should not render when no poster is available', function() {
      cy.bootstrap('<poster></poster>').then(() => {
        cy.select('poster')
          .find('img')
          .should('not.exist')
      })
    })
  })

  describe('logic', () => {
    it('should render the episode poster', function() {
      cy.bootstrap('<poster></poster>', [this.episode, this.show]).then(() => {
        cy.select('poster')
          .find('img')
          .should('have.attr', 'src', this.episode.poster)
      })
    })

    it('should render the show poster', function() {
      cy.bootstrap('<poster></poster>', [this.show]).then(() => {
        cy.select('poster')
          .find('img')
          .should('have.attr', 'src', this.show.show.poster)
      })
    })

    it('should render the show poster', function(done) {
      cy.bootstrap('<poster></poster>', [this.show, this.chapters]).then(app => {
        onUpdate(app, 'PLAYER_SET_CHAPTER', () => {
          cy.select('poster')
            .find('img')
            .should('have.attr', 'src', this.chapters.chapters[2].image)
          done()
        })
        app.dispatch({ type: 'PLAYER_SET_CHAPTER', payload: 2 })
      })
    })
  })
})
