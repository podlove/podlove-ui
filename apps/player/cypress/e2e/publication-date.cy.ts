import episode from '../fixtures/episode.json';

describe('<publication-date>', () => {
  describe('render', () => {
    it('should render', () => {
      cy.bootstrap('<publication-date></publication-date>', [episode])
      cy.query('publication-date').should('exist')
    })

    it('should set the color', () => {
      cy.bootstrap('<publication-date></publication-date>', [episode])
      cy.query('publication-date').should('have.css', 'color', 'rgb(0, 0, 0)')
    })
  })

  describe('logic', () => {
    it('should render the date in locale specific format', () => {
      cy.bootstrap('<publication-date></publication-date>', [episode])
      cy.query('publication-date').should('exist')
      cy.query('publication-date').should(
        'contain',
        new Date(episode.publicationDate).toLocaleDateString()
      )
    })

    it('should accept a custom date format', () => {
      // see https://date-fns.org/v1.30.1/docs/format
      cy.bootstrap('<publication-date format="d.M.Y"></publication-date>', [episode])
      cy.query('publication-date').should('exist')
      cy.query('publication-date').should('contain', '2.11.2999')
    })
  })
})
