describe('<divider>', () => {
  describe('render', () => {
    it('should render', () => {
      cy.bootstrap('<divider style="width: 200px;"></divider>').then(() => {
        cy.query('divider').should('exist')
      })
    })

    it('should have a color gradient', () => {
      cy.bootstrap('<divider style="width: 200px; --podlove-player--divider--color: #ff0000;"></divider>').then(() => {
        cy.query('divider').should(
          'have.css',
          'background-image',
          'linear-gradient(90deg, rgb(255, 0, 0) 25%, rgba(128, 126, 124, 0) 0px)'
        )
      })
    })
  })
})
