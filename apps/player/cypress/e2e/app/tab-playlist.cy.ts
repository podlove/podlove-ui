import { onUpdate } from '../../helpers/state.js';
import { select } from '../../helpers/selectors.js';
import playlist from '../../fixtures/playlist.json';
import episode from '../../fixtures/episode.json';
import { toggleTab } from '@podlove/player-actions/tabs';
import { selectEpisode } from '@podlove/player-actions/playlist';
import { requestPause, requestPlay } from '@podlove/player-actions/play';

describe('<tab-playlist>', () => {
  beforeEach(() => {
    cy.intercept('GET', '/episode.json', episode);
  });

  describe('render', () => {
    describe('title', () => {
      it('should render the tab title', () => {
        cy.app('<tab-playlist style="width: 400px;"></tab-playlist>', [playlist]);
        cy.query('tab-title').should('exist');
        cy.query('tab-title').should('contain', 'Related Episodes');
      });
    });

    describe('list', () => {
      it(`shouldn't render entries if no playlists are available`, () => {
        cy.app('<tab-playlist style="width: 400px;"></tab-playlist>', []);
        cy.query('tab-playlist--entry').should('have.length', 0);
      });

      it(`should render entries if playlists are available`, () => {
        cy.app('<tab-playlist style="width: 400px;"></tab-playlist>', [playlist]);
        cy.query('tab-playlist--entry').should('have.length', playlist.playlist.length);
      });

      it(`should render the entries in the right order`, () => {
        cy.app('<tab-playlist style="width: 400px;"></tab-playlist>', [playlist]);
        cy.query('tab-playlist--entry--title').then((nodes) => {
          playlist.playlist.forEach((entry, index) => {
            expect(nodes.get(index).textContent).to.contain(entry.title);
          });
        });
      });
    });
  });

  describe('logic', () => {
    let assert, dispatch;

    beforeEach(() => {
      cy.app('<tab-playlist style="width: 400px;"></tab-playlist>', [playlist]).then(
        (app) => {
          assert = onUpdate(app);
          dispatch = app.dispatch;
        }
      );
    });

    describe('title', () => {
      it('should trigger the toggle tab action on close', (done) => {
        assert(toggleTab.toString(), (_, { payload }) => {
          expect(payload).to.equal('playlist');
          done();
        });

        cy.query('tab-title--close').click();
      });
    });

    describe('list', () => {
      it('should mark the current episode as active', (done) => {
        cy.query('tab-playlist--entry--active').should('not.exist');

        assert(selectEpisode.toString(), () => {
          cy.query('tab-playlist--entry--active').should('exist');
          cy.query('tab-playlist--entry--active')
            .find(select('tab-playlist--entry--title'))
            .should('contain', playlist.playlist[0].title);
          done();
        });

        dispatch(selectEpisode({ index: 0, play: false }));
      });

      it('should dispatch the action to select and play an episode', (done) => {
        assert(selectEpisode.toString(), (_, { payload: { index: index } }) => {
          expect(index).to.equal(1);
          done();
        });

        cy.query('tab-playlist--entry--interaction').eq(1).click();
      });

      it('should dispatch the action to play the current episode', (done) => {
        assert(requestPlay.toString(), () => done());

        assert(selectEpisode.toString(), () => {
          cy.query('tab-playlist--entry--interaction').eq(1).should('be.visible').click();
        });

        dispatch(selectEpisode({ index: 1, play: false }));
      });

      it('should dispatch the action to pause the current episode', (done) => {
        assert(requestPause.toString(), () => done());

        cy.query('tab-playlist--entry--interaction').eq(1).click();
        cy.query('tab-playlist--entry--interaction').eq(1).click();
      });
    });
  });
});
