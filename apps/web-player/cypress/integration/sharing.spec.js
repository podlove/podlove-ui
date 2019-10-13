const { onUpdate } = require('../helpers/state')
const { select } = require('../helpers/selectors')

describe('sharing', () => {
  beforeEach(cy.setup)

  it('should generate the correct share link', () => {
    cy.embed('<div></div>', { episode: '/test/episode.json', config: '/test/config.json' }).then(app => {
      app.dispatch({ type: 'PLAYER_TOGGLE_TAB', payload: 'share' })
    })

    cy.select('tab-share--embed--input').should('have.value', '<iframe title="Podlove Web Player: Forschergeist - FG066 Klimaneutralität" height="200" src="http://localhost:9000/share.html?config=%2Ftest%2Fconfig.json&episode=%2Ftest%2Fepisode.json" frameborder="0" scrolling="no" tabindex="0"></iframe>')
  })

  it('should render the share template', () => {
    cy.share({ episode: '/test/episode.json', config: '/test/config.json' })
    cy.get(select('player--share')).should('exist')
  })

  it('should parse the start time', done => {
    cy.share({ episode: '/test/episode.json', config: '/test/config.json', params: { t: '00:10' } }).then(app => {
      onUpdate(app, 'PLAYER_REQUEST_PLAYTIME', state => {
        expect(state.timepiece.playtime).to.equal(10000)
        done()
      })
    })

  })
})
