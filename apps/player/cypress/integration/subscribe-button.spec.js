/* eslint-env mocha */
/* globals cy */
const { onUpdate } = require('../helpers/state')
describe('<subscribe-button>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render when configured', function () {
      cy.bootstrap('<subscribe-button></subscribe-button>', [this.theme, this.subscribeButton])
      cy.select('subscribe-button').should('exist')
    })

    it(`shouldn't render when not configured`, function () {
      cy.bootstrap('<subscribe-button></subscribe-button>', [this.theme])
      cy.select('subscribe-button').should('not.exist')
    })

    it(`should style the button`, function () {
      cy.bootstrap('<subscribe-button></subscribe-button>', [this.theme, this.subscribeButton])
      cy.select('subscribe-button').should('have.css', 'color', 'rgb(35, 89, 115)')
      cy.select('subscribe-button').should('have.css', 'border-color', 'rgb(35, 89, 115)')
      cy.select('subscribe-button').should('have.css', 'background-color', 'rgb(255, 255, 255)')
      cy.select('subscribe-button').should('have.css', 'font-family', 'boldFont')
    })
  })

  describe('logic', () => {
    it('should dispatch the correct action on click', function (done) {
      cy.bootstrap('<subscribe-button></subscribe-button>', [this.theme, this.subscribeButton]).then((app) => {
        onUpdate(app, 'BUTTON_SHOW_OVERLAY', () => done())
        cy.select('subscribe-button').click()
      })
    })
  })
})

