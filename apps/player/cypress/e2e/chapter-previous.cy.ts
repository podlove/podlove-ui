import { setChapter } from '@podlove/player-actions/chapters';
import chapters from '../fixtures/chapters.json';
import { onUpdate } from '../helpers/state.js';

describe('<chapter-previous>', () => {
  describe('render', () => {
    it('should not render when chapters are not available', () => {
      cy.bootstrap('<chapter-previous></chapter-previous>').then(() => {
        cy.query('chapter-previous').should('not.exist');
      });
    });

    it('should render when chapters are available', () => {
      cy.bootstrap('<chapter-previous></chapter-previous>', [chapters]).then(() => {
        cy.query('chapter-previous').should('exist');
      });
    });
  });

  describe('logic', () => {
    let assert, store;

    beforeEach(() =>
      cy.bootstrap('<chapter-previous></chapter-previous>', [chapters]).then((app) => {
        expect(app.getState().chapters.current.index).to.equal(0);
        cy.query('chapter-previous').should('exist');
        store = app;
        store.dispatch(setChapter(2));
        assert = onUpdate(store);
      })
    );

    it('should jump to the previoys chapter on click', (done) => {
      assert(setChapter.toString(), (state) => {
        expect(state.chapters.current.index).to.equal(1);
        done();
      });
      cy.query('chapter-previous').click();
    });

    it('should be disabled on first chapter', (done) => {
      assert(setChapter.toString(), (state) => {
        expect(state.chapters.current.index).to.equal(0);
        cy.query('chapter-previous').should('be.disabled');
        done();
      });

      store.dispatch(setChapter(0));

      cy.query('chapter-previous').should('be.disabled');
    });
  });
});
