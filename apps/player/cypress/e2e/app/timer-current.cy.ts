import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { onUpdate } from '../../helpers/state.js';

describe('<timer-current>', () => {
  let dispatch, assert;

  beforeEach(() => {
    cy.app('<timer-current></timer-current>', []).then((app) => {
      dispatch = app.dispatch;
      assert = onUpdate(app);
    });
  });

  describe('render', () => {
    it('should render the current time', () => {
      cy.query('timer-current').should('exist');
      cy.query('timer-current').should('contain', '00:00');
    });
  });

  describe('logic', () => {
    it('should update on playtime change', (done) => {
      assert(requestPlaytime.toString(), () => {
        cy.query('timer-current').should('contain', '01:00');
        done();
      });

      dispatch(requestPlaytime(60000));
    });
  });
});
