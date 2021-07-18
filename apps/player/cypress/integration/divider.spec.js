/* eslint-env mocha */

describe('<divider>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render', function () {
      cy.bootstrap('<divider style="width: 200px;"></divider>').then(() => {
        cy.select('divider').should('exist')
      })
    })

    it('should have a color gradient', function () {
      cy.bootstrap('<divider style="width: 200px;"></divider>').then(() => {
        cy.select('divider').should(
          'have.css',
          'background-image',
          'linear-gradient(90deg, rgb(128, 126, 124) 25%, rgba(128, 126, 124, 0) 0px)'
        )
      })
    })
  })
})
