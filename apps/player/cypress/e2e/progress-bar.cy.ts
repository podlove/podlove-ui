import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { light } from '@podlove/utils/color';
import { fade } from 'farbraum';

import episode from '../fixtures/episode.json';
import audio from '../fixtures/audio.json';
import theme from '../fixtures/theme.json';
import chapters from '../fixtures/chapters.json';
import { onUpdate } from '../helpers/state.js';
import { inlineStyle } from '../helpers/css.js';

describe('<progress-bar>', () => {
  let assert, dispatch;

  beforeEach(() => {
    const styles = inlineStyle({
      width: '200px',
      '--podlove-player--progress-bar--progress-color': theme.tokens.brandDark,
      '--podlove-player--progress-bar--track-color': theme.tokens.brandDark,
      '--podlove-player--progress-bar--thumb-color': theme.tokens.brandDark,
      '--podlove-player--progress-bar--thumb-border-color': theme.tokens.brandLightest,
      '--podlove-player--progress-bar--ghost-color': fade(theme.tokens.brandDark, 0.2),
      '--podlove-player--progress-bar--ghost-border-color': theme.tokens.brandLightest,
      '--podlove-player--progress-bar--buffer-background-color': fade(light, 0.5)
    });

    cy.bootstrap(
      `<progress-bar style="${styles}"></progress-bar >`,
      [episode, audio, chapters]
    ).then((app) => {
      assert = onUpdate(app);
      dispatch = app.dispatch;
    });
  });


  describe('render', () => {
    it('should render the progress bar', function () {
      cy.query('progress-bar').should('exist')
    })

    it('should set the progress range color', () => {
      cy.query('progress-bar')
        .find('.progress-range')
        .should('have.css', 'background-color', 'rgb(35, 89, 115)')
    })

    it('should set the thumb color', () => {
      cy.query('progress-bar')
        .find('.progress-thumb')
        .should('have.css', 'background-color', 'rgb(35, 89, 115)')
      cy.query('progress-bar')
        .find('.progress-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)')
    })

    it('should set the ghost thumb color', () => {
      cy.query('progress-bar')
        .find('.ghost-thumb')
        .should('have.css', 'background-color', 'rgba(35, 89, 115, 0.8)')
      cy.query('progress-bar')
        .find('.ghost-thumb')
        .should('have.css', 'border-color', 'rgb(233, 241, 245)')
    })
  })

  describe('logic', () => {
    it('should render the chapters', () => {
      cy.query('progress-bar--chapter-progress--indicator').should('have.length', 3)
    })

    it('should set the thumb according to current playtime', (done) => {
      assert(requestPlaytime.toString(), () => {
        cy.query('progress-bar').find('.progress-thumb').should('have.css', 'left', '66.2891px')
        done();
      })

      cy.query('progress-bar')
        .find('.progress-thumb')
        .should('have.css', 'left', '0px')
        .then(() => {
          dispatch(requestPlaytime(4000))
        })
    })
  })
})
