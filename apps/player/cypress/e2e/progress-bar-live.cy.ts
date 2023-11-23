import { backendLiveSync, requestPlaytime } from '@podlove/player-actions/timepiece';
import { light } from '@podlove/utils/color';
import { fade } from 'farbraum';
import episode from '../fixtures/episode.json';
import audio from '../fixtures/audio.json';
import theme from '../fixtures/theme.json';
import { onUpdate } from '../helpers/state.js';
import { inlineStyle } from '../helpers/css.js';

describe('<progress-bar-live>', () => {
  let assert, dispatch;

  beforeEach(() => {
    const styles = inlineStyle({
      width: '200px',
      '--podlove-player--progress-bar-live--progress-color': theme.tokens.brandDark,
      '--podlove-player--progress-bar-live--track-color': theme.tokens.brandDark,
      '--podlove-player--progress-bar-live--thumb-color': theme.tokens.brandDark,
      '--podlove-player--progress-bar-live--thumb-border-color': theme.tokens.brandLightest,
      '--podlove-player--progress-bar-live--ghost-color': fade(theme.tokens.brandDark, 0.2),
      '--podlove-player--progress-bar-live--ghost-border-color': theme.tokens.brandLightest,
      '--podlove-player--progress-bar-live--buffer-background-color': fade(light, 0.5)
    });

    cy.bootstrap(
      `<progress-bar-live style="${styles}"></progress-bar-live>`,
      [episode, audio]
    ).then((app) => {
      assert = onUpdate(app);
      dispatch = app.dispatch;
    });
  });

  describe('render', () => {
    it('should render the progress bar', () => {
      cy.query('progress-bar-live').should('exist');
    });

    it('should set the progress range color', () => {
      cy.query('progress-bar-live')
        .find('.progress-range')
        .should('have.css', 'background-color', 'rgb(35, 89, 115)');
    });

    it('should set the thumb color', () => {
      cy.query('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'background-color', 'rgb(35, 89, 115)');
      cy.query('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)');
    });

    it('should set the ghost thumb color', () => {
      cy.query('progress-bar-live')
        .find('.ghost-thumb')
        .should('have.css', 'background-color', 'rgba(35, 89, 115, 0.8)');
      cy.query('progress-bar-live')
        .find('.ghost-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)');
    });
  });

  describe('logic', () => {
    beforeEach(() => {
      dispatch(backendLiveSync(12000));
    });

    it('should set the thumb according to current playtime', (done) => {
      assert(requestPlaytime.toString(), () => {
        cy.query('progress-bar-live')
          .find('.progress-thumb')
          .should('have.css', 'left', '66.6641px');

        done();
      });

      cy.query('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'left', '0px')
        .then(() => {
          dispatch(requestPlaytime(4000));
        });
    });

    it('should set the thumb to the right if playtime equals livesync', (done) => {
      assert(requestPlaytime.toString(), () => {
        cy.query('progress-bar-live').find('.progress-thumb').should('have.css', 'left', '200px');
        done();
      });

      cy.query('progress-bar-live')
        .find('.progress-thumb')
        .should('have.css', 'left', '0px')
        .then(() => {
          dispatch(requestPlaytime(4000));
        });
    });
  });
});
