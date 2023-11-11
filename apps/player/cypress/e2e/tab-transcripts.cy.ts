import { onUpdate } from '../helpers/state.js';
import chapters from '../fixtures/chapters.json';
import transcripts from '../fixtures/transcripts.json';
import { followTranscripts, nextTranscriptsSearchResult, previousTranscriptsSearchResult, searchTranscripts } from '@podlove/player-actions/transcripts';
import { toggleTab } from '@podlove/player-actions/tabs';
describe('<tab-transcripts>', () => {
  let assert, dispatch;

  beforeEach(() => {
    cy.bootstrap('<tab-transcripts></tab-transcripts>', [
      chapters,
      transcripts
    ]).then((app) => {
      assert = onUpdate(app);
      dispatch = app.dispatch;
    });
  });

  describe('render', () => {
    beforeEach(() => {
      dispatch(searchTranscripts('lorem'));
    });
    describe('title', () => {
      it('should render the tab title', () => {
        cy.query('tab-title').should('exist');
        cy.query('tab-title').should('contain', 'Transcript');
      });
    });

    describe('search', () => {
      it('should render the search input', () => {
        cy.query('tab-transcripts--search').should('exist');
        cy.query('tab-transcripts--search').should('have.value', 'lorem');
      });

      it('should render the search controls', () => {
        cy.query('tab-transcripts--search-controls').should('exist');
        cy.query('tab-transcripts--search-controls--previous').should('exist');
        cy.query('tab-transcripts--search-controls--next').should('exist');
      });
    });

    describe('follow', () => {
      it('should render the follow button', () => {
        cy.query('tab-transcripts--follow').should('exist');
      });
    });

    describe('transcripts', () => {
      it('should render the transcripts', (done) => {
        assert(searchTranscripts.toString(), () => {
          cy.query('tab-transcripts--entry').should('have.length', 5);
          done();
        });

        dispatch(searchTranscripts('lorem'));
      });
    });
  });

  describe('logic', () => {
    describe('title', () => {
      it('should trigger the toggle tab action on close', () => {
        assert(toggleTab.toString(), (_, { payload }) => {
          expect(payload).to.equal('transcripts');
        });

        cy.query('tab-title--close').click();
      });
    });

    describe('search', () => {
      describe('controls', () => {
        beforeEach(() => {
          dispatch(searchTranscripts('lorem'));
        });

        it('should show the search results', () => {
          cy.query('tab-transcripts--search-controls').should('exist');
          cy.query('tab-transcripts--search-controls--current-result').should('contain', '1');
          cy.query('tab-transcripts--search-controls--total-result').should('contain', '6');
        });

        it('should jump to the next search result if clicked', (done) => {
          assert(nextTranscriptsSearchResult.toString(), () => {
            done();
          });

          cy.query('tab-transcripts--search-controls--next').click();
        });

        it('should jump to the previous search result if clicked', (done) => {
          assert(previousTranscriptsSearchResult.toString(), () => {
            done();
          });
          cy.query('tab-transcripts--search-controls--next').click();
          cy.query('tab-transcripts--search-controls--previous').click();
        });

        it('should show a message when no results are available', () => {
          assert(searchTranscripts.toString(), () => {
            cy.query('tab-transcripts--search-controls--no-results').should('exist');
          });
          dispatch(searchTranscripts('not in the transcript'));
        });
      });

      describe('results', () => {
        it('should highlight all results', (done) => {
          assert(searchTranscripts.toString(), () => {
            cy.query('tab-transcripts--results')
              .find('span[style*="background: rgb(128, 126, 124)"]')
              .should('have.length', 6);
            done();
          });
          dispatch(searchTranscripts('lorem'));
        });
      });
    });

    describe('follow', () => {
      it('should disable follow on click', (done) => {
        assert(followTranscripts.toString(), (_, { payload }) => {
          expect(payload).to.equal(false);
          done();
        });

        cy.query('tab-transcripts--follow').click();
      });

      it('should enable follow on click', (done) => {
        dispatch(followTranscripts(false));

        assert(followTranscripts.toString(), (_, { payload }) => {
          expect(payload).to.equal(true);
          done();
        });

        cy.query('tab-transcripts--follow').click();
      });
    });
  });
});
