import { setChapter } from '@podlove/player-actions/chapters';
import chapters from '../fixtures/chapters.json';
import { onUpdate } from '../helpers/state.js';

describe('<current-chapter>', () => {
  describe('render', () => {
    it('should not render the show title when chapters are not available', () => {
      cy.bootstrap('<current-chapter></current-chapter>').then(() => {
        cy.query('current-chapter').should('not.exist');
      });
    });

    it('should render the show title when chapters are available', () => {
      cy.bootstrap('<current-chapter></current-chapter>', [chapters]).then(() => {
        cy.query('current-chapter').should('exist');
      });
    });
  });

  describe('logic', () => {
    it('should show the current chapter title', () => {
      cy.bootstrap('<current-chapter></current-chapter>', [chapters]).then(() => {
        cy.query('current-chapter').should('contain', `I'm a thing`);
      });
    });

    it('should show the chapter last chapter', (done) => {
      cy.bootstrap('<current-chapter></current-chapter>', [chapters]).then((store) => {
        onUpdate(store, setChapter.toString(), () => {
          cy.query('current-chapter').should('contain', `I'm a thing`);
          done();
        });

        store.dispatch(setChapter(2));
      });
    });
  });
});
