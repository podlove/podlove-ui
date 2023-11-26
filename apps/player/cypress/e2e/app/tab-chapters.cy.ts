import { requestPause, requestPlay } from '@podlove/player-actions/play';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { toggleTab } from '@podlove/player-actions/tabs';
import { onUpdate } from '../../helpers/state.js';
import { select } from '../../helpers/selectors.js';
import theme from '../../fixtures/theme.json';
import chapters from '../../fixtures/chapters.json';

describe('<tab-chapters>', () => {
  describe('render', () => {
    describe('title', () => {
      it('should render the tab title', () => {
        cy.app('<tab-chapters style="width: 400px;"></tab-chapters>', [
          { theme, version: 5 }
        ]);
        cy.query('tab-title').should('exist');
        cy.query('tab-title').should('contain', 'Chapters');
      });
    });

    describe('list', () => {
      it(`shouldn't render entries if no chapters are available`, () => {
        cy.app('<tab-chapters style="width: 400px;"></tab-chapters>', [
          { theme, version: 5 }
        ]);
        cy.query('tab-chapters--entry').should('have.length', 0);
      });

      it(`should render entries if chapters are available`, () => {
        cy.app('<tab-chapters style="width: 400px;"></tab-chapters>', [
          { theme, version: 5 },
          chapters
        ]);
        cy.query('tab-chapters--entry').should('have.length', chapters.chapters.length);
      });

      it(`should render the entries in the right order`, () => {
        cy.app('<tab-chapters style="width: 400px;"></tab-chapters>', [
          { theme, version: 5 },
          chapters
        ]);
        cy.query('tab-chapters--entry').then((nodes: any) => {
          chapters.chapters.forEach((chapter, index) => {
            expect(nodes.get(index).textContent).to.contain(chapter.title);
          });
        });
      });
    });
  });

  describe('logic', () => {
    let assert, dispatch;

    beforeEach(() => {
      cy.app('<tab-chapters style="width: 400px;"></tab-chapters>', [
        { theme, version: 5 },
        chapters
      ]).then((app) => {
        assert = onUpdate(app);
        dispatch = app.dispatch;
      });
    });

    describe('title', () => {
      it('should trigger the toggle tab action on close', (done) => {
        assert(toggleTab.toString(), (_, { payload }) => {
          expect(payload).to.equal('chapters');
          done();
        });

        cy.query('tab-title--close').click();
      });
    });

    describe('list', () => {
      describe('interactions', () => {
        it('should render a play icon on the active chapter', () => {
          cy.query('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-play'))
            .should('exist');
          cy.query('tab-chapters--entry').eq(1).find(select('tab-chapters--index')).should('exist');
          cy.query('tab-chapters--entry').eq(2).find(select('tab-chapters--index')).should('exist');
        });

        it('should render a pause icon on the active chapter', () => {
          assert(requestPlay.toString(), () => {
            cy.query('tab-chapters--entry')
              .eq(0)
              .find(select('tab-chapters--trigger--menu-pause'))
              .should('exist');
          });

          dispatch(requestPlay());
        });

        it(`should dispatch the ${requestPlay.toString()} action on click`, (done) => {
          assert(requestPlay.toString(), () => done());

          cy.query('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-play'))
            .click();
        });

        it(`should dispatch the ${requestPause.toString()} action on click`, (done) => {
          assert(requestPause.toString(), () => done());

          cy.query('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-play'))
            .click();
          cy.query('tab-chapters--entry')
            .eq(0)
            .find(select('tab-chapters--trigger--menu-pause'))
            .click();
        });

        it('starts the playback on chapter start time', (done) => {
          assert(requestPlay.toString(), (state) => {
            expect(state.timepiece.playtime).to.equal(6000);
            done();
          });

          cy.query('tab-chapters--entry').eq(1).trigger('mouseover');
          cy.query('tab-chapters--entry')
            .eq(1)
            .find(select('tab-chapters--trigger--menu-play'))
            .click();
        });

        it('should display the link if available', () => {
          cy.query('tab-chapters--entry')
            .eq(2)
            .find('a')
            .should('have.attr', 'href', chapters.chapters[2].href);
        });

        it('should show the link icon on interaction', () => {
          cy.query('tab-chapters--entry').eq(2).find('a').trigger('mouseover');
          cy.query('tab-chapters--entry')
            .eq(2)
            .find(select('tab-chapters--trigger--link-icon'))
            .should('exist');
        });
      });

      describe('timers', () => {
        it('should show the remaining time on the active chapter', (done) => {
          assert(requestPlaytime.toString(), () => {
            cy.query('tab-chapters--entry').eq(0).find('time').should('contain', '-00:05');
            done()
          });

          dispatch(requestPlaytime(1000));
        });

        it('should show the remaining time on the inactive chapter', (done) => {
          assert(requestPlaytime.toString(), () => {
            cy.query('tab-chapters--entry').eq(0).find('time').should('contain', '00:08');
            done()
          });

          dispatch(requestPlaytime(1000));
        });
      });
    });
  });
});
