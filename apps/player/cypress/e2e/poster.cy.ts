import { setChapter } from '@podlove/player-actions/chapters';
import episode from '../fixtures/episode.json';
import show from '../fixtures/show.json';
import chapters from '../fixtures/chapters.json';
import { onUpdate } from '../helpers/state.js';

describe('<poster>', () => {
  describe('render', () => {
    it('should render when a poster is available', () => {
      cy.bootstrap('<poster></poster>', [episode, show]).then(() => {
        cy.query('poster').find('img').should('exist');
      });
    });

    it('should not render when no poster is available', () => {
      cy.bootstrap('<poster></poster>').then(() => {
        cy.query('poster').find('img').should('not.exist');
      });
    });
  });

  describe('logic', () => {
    it('should render the episode poster', () => {
      cy.bootstrap('<poster></poster>', [episode, show]).then(() => {
        cy.query('poster').find('img').should('have.attr', 'src', episode.poster);
      });
    });

    it('should render the show poster', () => {
      cy.bootstrap('<poster></poster>', [show]).then(() => {
        cy.query('poster').find('img').should('have.attr', 'src', show.show.poster);
      });
    });

    it('should render the show poster', (done) => {
      cy.bootstrap('<poster></poster>', [show, chapters]).then((app) => {
        onUpdate(app, 'PLAYER_SET_CHAPTER', () => {
          cy.query('poster').find('img').should('have.attr', 'src', chapters.chapters[2].image);
          done();
        });
        app.dispatch(setChapter(2));
      });
    });
  });
});
