import { setVolume } from '@podlove/player-actions/audio';
import { onUpdate } from '../helpers/state.js';

describe('<volume-control>', () => {
  let dispatch, assert;

  beforeEach(() => {
    cy.bootstrap('<volume-control></volume-control>', []).then((app) => {
      dispatch = app.dispatch;
      assert = onUpdate(app);
    });
  });

  describe('render', () => {
    it('should render the volume control', () => {
      cy.query('volume-control').should('exist');
    });

    it('should render the volume slider', () => {
      cy.query('volume-control').click();
      cy.query('volume-control--slider').should('exist');
    });
  });

  describe('logic', () => {
    it('should reflect the volume on input', (done) => {
      assert(setVolume.toString(), () => {
        cy.query('volume-control--slider').find('input').should('have.value', '50');
        done();
      });

      cy.query('volume-control').click();
      dispatch(setVolume(0.5));
    });
  });
});
