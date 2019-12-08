/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

const channels = ['facebook', 'twitter', 'whats-app', 'linkedin', 'pinterest', 'xing', 'mail']

describe('<tab-share>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    beforeEach(function() {
      cy.bootstrap('<tab-share></tab-share>', [
        this.theme,
        this.episode,
        this.reference,
        this.share
      ])
    })

    describe('title', () => {
      it('should render the tab title', () => {
        cy.select('tab-title').should('exist')
        cy.select('tab-title').should('contain', 'Share Episode')
      })
    })

    describe('channels', () => {
      channels.forEach(channel => {
        it(`should render ${channel} share`, () => {
          cy.select(`tab-share--channels--${channel}`).should('exist')
        })
      })
    })

    describe('playtime', () => {
      it('should render the playtime checkbox', () => {
        cy.select('tab-share--playtime')
          .find('input')
          .should('exist')
      })

      it('should render the playtime label', () => {
        cy.select('tab-share--playtime')
          .find('.label')
          .should('contain', 'Also share current playtime (00:00)')
      })
    })

    describe('embed', () => {
      it('should render the embed code', () => {
        cy.select('tab-share--embed').should('exist')
      })

      it('should not render the embed code when the reference is missing', () => {
        cy.bootstrap('<tab-share></tab-share>', [this.theme, this.episode])
        cy.select('tab-share--embed').should('not.exist')
      })
    })
  })

  describe('logic', () => {
    let assert, dispatch

    beforeEach(function() {
      cy.bootstrap(
        `
        <tab-share></tab-share>
      `,
        [this.theme, this.episode, this.audio, this.reference, this.share, { playtime: 8000 }]
      ).then(app => {
        assert = onUpdate(app)
        dispatch = app.dispatch
      })
    })

    describe('title', () => {
      it('should trigger the toggle tab action on close', done => {
        assert('PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('share')
          done()
        })

        cy.select('tab-title--close').click()
      })
    })

    describe('channels', () => {
      channels.forEach(channel => {
        describe(channel, () => {
          it('should set the share link', function() {
            cy.select(`tab-share--channels--${channel}`)
              .find('a')
              .should('have.attr', 'href')
              .and('include', encodeURIComponent(this.episode.link))
          })

          it('should include the playtime in the share link', function(done) {
            assert('PLAYER_SELECT_CONTENT', () => {
              cy.wait(50)
              cy.select(`tab-share--channels--${channel}`)
                .find('a')
                .then(link => {
                  expect(link.attr('href')).to.include(encodeURIComponent('t=00%3A08'))
                  done()
                })
            })

            dispatch({ type: 'PLAYER_SELECT_CONTENT', payload: 'time' })
          })
        })
      })

      // Test when copy to clipboard is testable
      describe.skip('link', () => {
        it('should copy the link', function() {
          cy.select(`tab-share--channels--link`)
            .find('a')
            .click({ native: true })
          // should include this.episode.link
        })

        it('should include the playtime in the share link', function(done) {
          assert('PLAYER_SELECT_CONTENT', () => {
            cy.select(`tab-share--channels--link`)
              .find('a')
              .click()
            done()
          })

          dispatch({ type: 'PLAYER_SELECT_CONTENT', payload: 'time' })
        })
      })

      describe('embed', () => {
        it('should contain the correct embed code', () => {
          cy.select('tab-share--embed--input').should(
            'have.value',
            '<iframe title="Podlove Web Player: - And until then, I can never die?" height="200" src="http://localhost:8080/share?config=%2F%2Flocalhost%3A8080%2Ffixtures%2Fconfig.json&episode=%2F%2Flocalhost%3A8080%2Ffixtures%2Fepisode.json" frameborder="0" scrolling="no" tabindex="0"></iframe>'
          )
        })

        it('should contain the playtime if enabled', () => {
          assert('PLAYER_SELECT_CONTENT', () => {
            cy.select('tab-share--embed--input').should(
              'have.value',
              '<iframe title="Podlove Web Player: - And until then, I can never die?" height="200" src="http://localhost:8080/share?config=%2F%2Flocalhost%3A8080%2Ffixtures%2Fconfig.json&episode=%2F%2Flocalhost%3A8080%2Ffixtures%2Fepisode.json&t=00%3A08" frameborder="0" scrolling="no" tabindex="0"></iframe>'
            )
          })

          dispatch({ type: 'PLAYER_SELECT_CONTENT', payload: 'time' })
        })

        it.skip('should copy the embed code on click', () => {
          // TBD
        })
      })
    })
  })
})
