/* eslint-env mocha */

describe('<episode-title>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render', function() {
      cy.bootstrap('<episode-title></episode-title>', [this.episode])
      cy.select('episode-title').should('exist')
    })

    it('should set the font', function() {
      cy.bootstrap('<episode-title></episode-title>', [this.episode, this.theme])
      cy.select('episode-title').should('have.css', 'font-family', 'boldFont')
    })
  })

  describe('logic', () => {
    it('should render just the text if no link is available', function() {
      cy.bootstrap('<episode-title></episode-title>', [{ title: this.episode.title }])
      cy.select('episode-title--link').should('not.exist')
      cy.select('episode-title--text').should('exist')
    })

    it('should render the episode link if available', function() {
      cy.bootstrap('<episode-title></episode-title>', [this.episode])
      cy.select('episode-title--link')
        .its('href')
        .should('be', 'http://link/to/episode')
    })

    it('should render the target to _parent when in native mode', function() {
      cy.bootstrap('<episode-title></episode-title>', [this.episode])
      cy.select('episode-title--link')
        .its('target')
        .should('be', '_parent')
    })

    it('should render the target to _blank when in native mode', function() {
      cy.bootstrap('<episode-title></episode-title>', [
        this.episode,
        { runtime: { mode: 'embed' } }
      ])
      cy.select('episode-title--link')
        .its('target')
        .should('be', '_blank')
    })
  })
})
