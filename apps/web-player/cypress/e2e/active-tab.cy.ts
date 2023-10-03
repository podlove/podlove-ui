import { PodloveWebPlayerConfig } from "@podlove/types"

describe('active tab', () => {
  const config: PodloveWebPlayerConfig = {
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
    playlist: '/podcast/playlist.json',
    share: {
      channels: ['facebook', 'twitter', 'mail', 'link'],
      outlet: '/share.html',
      sharePlaytime: true
    }
  }

  beforeEach(cy.setup)

  describe('predefined tab', () => {
    it('should open the player with the configured tab', function () {
      cy.embed('<div></div>', {
        episode: { ...this.episode, chapters: '/podcast/chapters.json' },
        config
      })

      cy.wait(100)

      cy.query('player--xl').should('exist')
      cy.query('tab-trigger--chapters').should('exist')
      cy.query('tab-chapters').should('exist')
    })
  })

  describe('chapters', () => {
    it('should not query the chapters tab if no chapters are available', function () {
      cy.embed('<div></div>', {
        episode: { ...this.episode, chapters: null },
        config
      })

      cy.wait(100)

      cy.query('player--xl').should('exist')
      cy.query('tab-trigger--chapters').should('not.exist')
      cy.query('tab-chapters').should('not.exist')
    })
  })
})
