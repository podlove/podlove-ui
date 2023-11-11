import { requestPause, requestPlay } from '@podlove/player-actions/play';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import episode from '../fixtures/episode.json';
import audio from '../fixtures/audio.json';
import { onUpdate } from '../helpers/state.js';

describe('<play-button>', () => {
  describe('render', () => {
    it('should render', () => {
      cy.bootstrap('<play-button></play-button>').then(() => {
        cy.query('play-button').should('be.visible');
      });
    });

    it('should render the duration', () => {
      cy.bootstrap('<play-button></play-button>', [{ duration: '1:11:11' }]).then(() => {
        cy.query('play-button').should('contain', '1:11:11');
      });
    });

    it('should set the background color', () => {
      cy.bootstrap(
        '<play-button style="--podlove-player--play-button--background: rgb(35, 89, 115)"></play-button>',
        []
      ).then(() => {
        cy.query('play-button')
          .find('.play-button--wrapper')
          .should('have.css', 'background-color', 'rgb(35, 89, 115)');
      });
    });
  });

  describe('interface', () => {
    it('should set the label', () => {
      cy.bootstrap('<play-button label="Custom Label"></play-button>').then(() => {
        cy.query('play-button--label').should('contain', 'Custom Label');
      });
    });
  });

  describe('logic', () => {
    let dispatch, assert;

    beforeEach(() => {
      cy.bootstrap('<play-button></play-button>', [episode, audio]).then((app) => {
        assert = onUpdate(app);
        dispatch = app.dispatch;
      });
    });

    it('should show the loading indicator on play', () => {
      assert(requestPlay.toString(), () => {
        cy.get('#play-button--loading').should('be.visible');
      });
      dispatch(requestPlay());
    });

    it('should show the pause button on play', () => {
      assert(requestPlay.toString(), () => {
        cy.get('#play-button--pause').should('be.visible');
      });
      dispatch(requestPlay());
    });

    it('should show the play button on pause', () => {
      assert('REQUEST_PAUSE', () => {
        cy.get('#play-button--play').should('be.visible');
      });
      dispatch(requestPause());
    });

    it('should show the replay button on end', () => {
      assert('BACKEND_END', () => {
        cy.get('#play-button--restart').should('be.visible');
      });
      dispatch(requestPlaytime(12000));
      dispatch(requestPlay());
    });
  });
});
