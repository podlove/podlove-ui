const { onUpdate } = require('../helpers/state')
const { select } = require('../helpers/selectors')

describe('sharing', () => {
  beforeEach(cy.setup)

  it('should generate the correct embed code', () => {
    cy.embed('<div></div>', { episode: '/test/episode.json', config: '/test/config.json' })
    cy.select('tab-trigger--share').click()
    cy.select('tab-share--embed--input').should('exist')
    cy.select('tab-share--embed--input').then((input) => {
      expect(input.val()).to.include(
        'title="Podlove Web Player: Forschergeist - FG066 Klimaneutralität"'
      )
      expect(input.val()).to.include('height="200"')
      expect(input.val()).to.include(
        'share.html?config=%2Ftest%2Fconfig.json&episode=%2Ftest%2Fepisode.json'
      )
      expect(input.val()).to.include('frameborder="0" scrolling="no" tabindex="0"')
    })
  })

  it('should render the share template', () => {
    cy.share({ episode: '/test/episode.json', config: '/test/config.json' })
    cy.get(select('player--share')).should('exist')
  })

  it('should parse the start time', (done) => {
    cy.share({
      episode: '/test/episode.json',
      config: '/test/config.json',
      params: { t: '00:10' }
    }).then((app) => {
      onUpdate(app, 'PLAYER_REQUEST_PLAYTIME', (state) => {
        expect(state.timepiece.playtime).to.equal(10000)
        done()
      })
    })
  })
})
