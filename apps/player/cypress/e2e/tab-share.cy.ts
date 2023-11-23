import { selectContent } from '@podlove/player-actions/share';
import { onUpdate } from '../helpers/state.js';
import { select } from '../helpers/selectors.js';
import episode from '../fixtures/episode.json';
import reference from '../fixtures/reference.json';
import share from '../fixtures/share.json';
import audio from '../fixtures/audio.json';

const channels = share.share.channels;

describe('<tab-share>', () => {
  describe('render', () => {
    beforeEach(() => {
      cy.bootstrap('<tab-share></tab-share>', [episode, reference, share]);
    });

    describe('title', () => {
      it('should render the tab title', () => {
        cy.query('tab-title').should('exist');
        cy.query('tab-title').should('contain', 'Share Episode');
      });
    });

    describe('channels', () => {
      channels.forEach((channel) => {
        it(`should render ${channel} share`, () => {
          cy.query(`tab-share--channels--${channel}`).should('exist');
        });
      });
    });

    describe('playtime', () => {
      it('should render the playtime checkbox', () => {
        cy.query('tab-share--share-playtime').find('input').should('exist');
      });

      it('should render the playtime label', () => {
        cy.query('tab-share--share-playtime')
          .find(select('input-checkbox--label'))
          .should('contain', 'Share current position (00:00)');
      });
    });

    describe('embed', () => {
      it('should render the embed code', () => {
        cy.query('tab-share--share-playtime').should('exist');
      });

      it('should not render the embed code when the reference is missing', () => {
        cy.bootstrap('<tab-share></tab-share>', [episode]);
        cy.query('tab-share--share-playtime').should('not.exist');
      });
    });
  });

  describe('logic', () => {
    let assert, dispatch;

    beforeEach(() => {
      cy.bootstrap(
        `
        <tab-share></tab-share>
      `,
        [episode, audio, reference, share, { playtime: 8000 }]
      ).then((app) => {
        assert = onUpdate(app);
        dispatch = app.dispatch;
      });
    });

    describe('title', () => {
      it('should trigger the toggle tab action on close', (done) => {
        assert('PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('share');
          done();
        });

        cy.query('tab-title--close').click();
      });
    });

    describe('channels', () => {
      channels.forEach((channel) => {
        describe(channel, () => {
          it('should set the share link', () => {
            cy.query(`tab-share--channels--${channel}`)
              .find('a')
              .should('have.attr', 'href')
              .then((href) => {
                if (channel === 'link') {
                  expect(href).to.contain(episode.link);
                } else {
                  expect(href).to.contain(encodeURIComponent(episode.link));
                }
              });
          });

          it('should include the playtime in the share link', (done) => {
            assert(selectContent.toString(), () => {
              cy.wait(50);
              cy.query(`tab-share--channels--${channel}`)
                .find('a')
                .should('have.attr', 'href')
                .then((href) => {
                  if (channel === 'link') {
                    expect(href).to.contain('t=00%3A08');
                  } else {
                    expect(href).to.contain(encodeURIComponent('t=00%3A08'));
                  }
                  done();
                });
            });

            dispatch(selectContent('time'));
          });
        });
      });

      // Test when copy to clipboard is testable
      describe('link', () => {
        it('should include the playtime in the share link', (done) => {
          assert(selectContent.toString(), () => {
            cy.query(`tab-share--channels--link`).find('a').click();
            done();
          });

          dispatch(selectContent('time'));
        });
      });

      describe('embed', () => {
        it('should contain the correct embed code', () => {
          cy.query('tab-share--embed--input').should(
            'have.value',
            '<iframe title="Podlove Web Player: - And until then, I can never die?" height="200" src="http://localhost:8080/share?episode=%2F%2Flocalhost%3A8080%2Ffixtures%2Fconfig.json" frameborder="0" scrolling="no" tabindex="0"></iframe>'
          );
        });

        it('should contain the playtime if enabled', () => {
          assert(selectContent.toString(), () => {
            cy.query('tab-share--embed--input').should(
              'have.value',
              '<iframe title="Podlove Web Player: - And until then, I can never die?" height="200" src="http://localhost:8080/share?episode=%2F%2Flocalhost%3A8080%2Ffixtures%2Fconfig.json&t=00%3A08" frameborder="0" scrolling="no" tabindex="0"></iframe>'
            );
          });

          dispatch(selectContent('time'));
        });
      });
    });
  });
});
