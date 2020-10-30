/* eslint-env mocha */

/* eslint-env mocha */

describe('<publication-date>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render', function() {
      cy.bootstrap('<publication-date></publication-date>', [this.episode])
      cy.select('publication-date').should('exist')
    })

    it('should set the color', function() {
      cy.bootstrap('<publication-date></publication-date>', [this.episode, this.theme])
      cy.select('publication-date').should('have.css', 'color', 'rgb(0, 0, 0)')
    })
  })

  describe('logic', () => {
    it('should render the date in locale specific format', function() {
      cy.bootstrap('<publication-date></publication-date>', [this.episode])
      cy.select('publication-date').should('exist')
      cy.select('publication-date').should(
        'contain',
        new Date(this.episode.publicationDate).toLocaleDateString()
      )
    })

    it('should accept a custom date format', function() {
      // see https://date-fns.org/v1.30.1/docs/format
      cy.bootstrap('<publication-date format="d.M.Y"></publication-date>', [this.episode])
      cy.select('publication-date').should('exist')
      cy.select('publication-date').should('contain', '2.11.2999')
    })
  })
})
