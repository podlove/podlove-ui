import episode from '../fixtures/episode.json';

describe('<episode-title>', () => {

  describe('render', () => {
    it('should render', ()=> {
      cy.bootstrap('<episode-title></episode-title>', [episode])
      cy.query('episode-title').should('exist')
    })

    it('should set the font', ()=> {
      cy.bootstrap('<episode-title></episode-title>', [episode])
      cy.query('episode-title').should('have.css', 'font-family', 'boldFont')
    })
  })

  describe('logic', () => {
    it('should render just the text if no link is available', ()=> {
      cy.bootstrap('<episode-title></episode-title>', [{ title: episode.title }])
      cy.query('episode-title--link').should('not.exist')
      cy.query('episode-title--text').should('exist')
    })

    it('should render the episode link if available', ()=> {
      cy.bootstrap('<episode-title></episode-title>', [episode])
      cy.query('episode-title--link').should('have.attr', 'href', 'http://link/to/episode')
    })

    it('should render the target to _parent when in native mode', ()=> {
      cy.bootstrap('<episode-title></episode-title>', [episode])
      cy.query('episode-title--link').should('have.attr', 'target', '_parent')
    })

    it('should render the target to _blank when in native mode', ()=> {
      cy.bootstrap('<episode-title></episode-title>', [
        episode,
        { runtime: { mode: 'embed' } }
      ])
      cy.query('episode-title--link').should('have.attr', 'target', '_parent')
    })
  })
})
