describe('config parsing', () => {
  beforeEach(cy.setup)

  describe('chapters', () => {
    it('should resolve chapters from an url', function() {
      cy.embed('<div></div>', {
        episode: { ...this.episode, chapters: '/chapters.json' },
        config: '/test/config.json'
      })

      cy.select('player').should('exist')
      cy.select('tab-trigger--chapters').should('exist')
    })

    it('should resolve chapters from the episode', function() {
      cy.embed('<div></div>', {
        episode: { ...this.episode, chapters: this.chapters },
        config: '/test/config.json'
      })
      cy.select('player').should('exist')
      cy.select('tab-trigger--chapters').should('exist')
    })
  })

  describe('transcripts', () => {
    it('should resolve transcripts from an url', function() {
      cy.embed('<div></div>', {
        episode: { ...this.episode, transcripts: '/transcripts.json' },
        config: '/test/config.json'
      })
      cy.wait(100)
      cy.select('player').should('exist')
      cy.select('tab-trigger--transcripts').should('exist')
    })

    it('should resolve transcripts from the config', function() {
      cy.embed('<div></div>', {
        episode: { ...this.episode, transcripts: this.transcripts },
        config: '/test/config.json'
      })
      cy.wait(100)
      cy.select('player').should('exist')
      cy.select('tab-trigger--transcripts').should('exist')
    })
  })

  describe('playlist', () => {
    it('should resolve playlist from an url', function() {
      cy.embed('<div></div>', {
        episode: '/episode.json',
        config: { ...this.config, playlist: '/playlist.json' }
      })
      cy.select('player').should('exist')
      cy.select('tab-trigger--playlist').should('exist')
    })

    it('should resolve playlist from the config', function() {
      cy.embed('<div></div>', {
        episode: '/episode.json',
        config: { ...this.config, playlist: this.playlist }
      })
      cy.select('player').should('exist')
      cy.select('tab-trigger--playlist').should('exist')
    })
  })

  describe('active tab', () => {
    const tabs = ['chapters', 'transcripts', 'files', 'playlist', 'share']

    tabs.forEach(tab => {
      it(`should make the ${tab} tab active`, function() {
        cy.embed('<div></div>', {
          episode: '/episode.json',
          config: { ...this.config, activeTab: tab }
        })
        cy.wait(100)
        cy.select('player').should('exist')
        cy.select(`tab-${tab}`).should('exist')
      })
    })
  })
})
