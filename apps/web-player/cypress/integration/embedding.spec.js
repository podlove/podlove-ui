const { select } = require('../helpers/selectors')

describe('embedding', () => {
  beforeEach(cy.setup)

  describe('interface', () => {
    it('should accept references for episode and config', () => {
      cy.embed('<div></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('exist')
    })

    it('should accept plain config objects', function () {
      cy.embed('<div></div>', { episode: this.episode, config: this.config })
      cy.select('player').should('exist')
    })
  })

  describe('loading', () => {
    it(`should hide the content while it's loading loaded`, () => {
      cy.embed('<div></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('have.css', 'opacity', '0')
    })

    it(`should hide the content till it's loaded`, () => {
      cy.embed('<div></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').should('not.have.class', 'loaded')
      cy.wait(600)
      cy.select('player').should('have.class', 'loaded')
    })
  })

  describe('resolution', () => {
    it('should have a default width of 300px', () => {
      cy.embed('<div data-test="embed-frame"></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').then(element => expect(element.width()).to.equal(300))
    })

    it('should have a minimal width of 260px', () => {
      cy.embed('<div data-test="embed-frame" style="width: 240px;"></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').then(element => expect(element.width()).to.equal(260))
    })

    it('should have a maximum width of 900px', () => {
      cy.embed('<div data-test="embed-frame" style="width: 1337px;"></div>', { episode: '/episode.json', config: '/test/config.json' })
      cy.select('player').then(element => expect(element.width()).to.equal(900))
    })
  })
})
