/* eslint-env mocha */

describe('<show-title>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render', function() {
      cy.bootstrap('<show-title></show-title>', [this.show])
      cy.select('show-title').should('exist')
    })

    it('should set the font', function() {
      cy.bootstrap('<show-title></show-title>', [this.show, this.theme])
      cy.select('show-title').should('have.css', 'font-family', 'boldFont')
      cy.select('show-title').should('have.css', 'color', 'rgb(230, 68, 21)')
    })
  })

  describe('logic', () => {
    it('should render just the text if no link is available', function() {
      cy.bootstrap('<show-title></show-title>', [{ title: this.show.title }])
      cy.select('show-title--link').should('not.exist')
      cy.select('show-title--text').should('exist')
    })

    it('should render the show link if available', function() {
      cy.bootstrap('<show-title></show-title>', [this.show])
      cy.select('show-title--link').should('have.attr', 'href', 'http://link/to/show')
    })

    it('should render the target to _parent when in native mode', function() {
      cy.bootstrap('<show-title></show-title>', [this.show])
      cy.select('show-title--link').should('have.attr', 'target', '_parent')
    })
  })
})
