/* eslint-env mocha */
/* globals cy */

describe('<root>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    beforeEach(function () {
      cy.bootstrap('<root style="width: 250px; height: 250px;"></root>', [this.theme])
    })

    it('should render the root element', function () {
      cy.select('root').should('exist')
    })

    it('should set the correct background color', () => {
      cy.select('root').should('have.css', 'background-color', 'rgb(233, 241, 245)')
    })

    it('should set the correct font', () => {
      cy.select('root').should('have.css', 'font-family', 'regularFont')
      cy.select('root').should('have.css', 'font-weight', '300')
    })
  })

  describe('slot', () => {
    beforeEach(function () {
      cy.bootstrap('<root style="width: 250px; height: 250px;"><div data-test="inner">Inner Element</div></root>', [this.theme])
    })

    it('should show the slot content', () => {
      cy.select('inner').should('exist')
    })
  })
})
