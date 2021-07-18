describe('active tab', () => {
  const config = {
    version: 5,
    activeTab: 'chapters',
    theme: {
      tokens: {
        brand: '#E64415',
        brandDark: '#235973',
        brandDarkest: '#1A3A4A',
        brandLightest: '#E9F1F5',
        shadeDark: '#807E7C',
        shadeBase: '#807E7C',
        contrast: '#000',
        alt: '#fff'
      }
    },
    playlist: '/playlist.json',
    channels: ['facebook', 'twitter', 'mail', 'link'],
    share: {
      outlet: '/share.html',
      sharePlaytime: true
    },
    base: '/'
  }

  beforeEach(cy.setup)

  describe('predefined tab', () => {
    it('should open the player with the configured tab', function () {
      cy.embed('<div></div>', {
        episode: { ...this.episode, chapters: '/chapters.json' },
        config
      })

      cy.wait(100)

      cy.select('player').should('exist')
      cy.select('tab-trigger--chapters').should('exist')
      cy.select('tab-chapters').should('exist')
    })
  })

  describe('chapters', () => {
    it('should not select the chapters tab if no chapters are available', function () {
      cy.embed('<div></div>', {
        episode: { ...this.episode, chapters: null },
        config
      })

      cy.wait(100)

      cy.select('player').should('exist')
      cy.select('tab-trigger--chapters').should('not.exist')
      cy.select('tab-chapters').should('not.exist')
    })
  })
})
