/* eslint-env mocha */
/* globals cy, expect */
const { onUpdate } = require('../helpers/state')

describe('<tab-overflow>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    beforeEach(function () {
      cy.bootstrap('<tab-overflow style="width:400px;"></tab-overflow>', [this.theme])
    })

    it('should render', () => {
      cy.select('tab-overflow').should('exist')
    })

    it('should set the correct style', () => {
      cy.select('tab-overflow--shadow').should('have.css', 'background-image', 'linear-gradient(rgba(35, 89, 115, 0), rgb(35, 89, 115))')
    })
  })
})
