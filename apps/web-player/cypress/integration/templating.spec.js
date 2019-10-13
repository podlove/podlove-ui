const { select } = require('../helpers/selectors')

describe('templating', () => {
  beforeEach(cy.setup)

  describe('variants', () => {
    it('should load the xl variant by default', () => {
      cy.embed('<div></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('exist')
      cy.select('player--xl').should('exist')
    })

    it('should load the l variant', () => {
      cy.embed('<div data-variant="l"></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('exist')
      cy.select('player--l').should('exist')
    })

    it('should load the m variant', () => {
      cy.embed('<div data-variant="m"></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('exist')
      cy.select('player--m').should('exist')
    })
  })

  describe('template', () => {
    it('should accept a custom template reference', () => {
      cy.embed('<div data-template="/test/custom-template.html"></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('exist')
      cy.select('player--custom').should('exist')
    })

    it('should use the inner content as a template when no template or variant is declred', () => {
      cy.embed(`<div>
        <div data-test="player--custom">
          <play-button></play-button>
        </div>
      </div>`, { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('exist')
      cy.select('player--custom').should('exist')
    })

    it('should prefer a template over a variant', () => {
      cy.embed('<div data-variant="m" data-template="/test/custom-template.html"></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('exist')
      cy.select('player--custom').should('exist')
      cy.select('player--m').should('not.exist')
    })
  })
})
