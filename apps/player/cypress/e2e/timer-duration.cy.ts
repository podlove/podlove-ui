import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { onUpdate } from '../helpers/state.js';
import episode from '../fixtures/episode.json';

describe('<timer-duration>', () => {
  let dispatch, assert;

  beforeEach(() => {
    cy.bootstrap('<timer-duration></timer-duration>', [episode]).then((app) => {
      dispatch = app.dispatch;
      assert = onUpdate(app);
    });
  });

  describe('render', () => {
    it('should render the duration time', () => {
      cy.query('timer-duration').should('exist');
      cy.query('timer-duration').should('contain', '-00:12');
    });
  });

  describe('logic', () => {
    it('should update on playtime change', (done) => {
      assert(requestPlaytime.toString(), () => {
        cy.query('timer-duration').should('contain', '-00:11');
        done();
      });

      dispatch(requestPlaytime(1000));
    });

    it('should update on ghosttime change', (done) => {
      assert(requestPlaytime.toString(), () => {
        cy.query('timer-duration').should('contain', '-00:11');
        done();
      });

      dispatch(requestPlaytime(1000));
    });
  });
});
