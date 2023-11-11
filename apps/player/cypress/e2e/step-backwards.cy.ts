import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { onUpdate } from '../helpers/state.js';

describe('<step-backward>', () => {
  let assert, dispatch;

  beforeEach(() => {
    cy.bootstrap('<step-backward></step-backward>', []).then((app) => {
      assert = onUpdate(app);
      dispatch = app.dispatch;
    });
  });

  describe('render', () => {
    it('should render', () => {
      cy.query('step-backward').should('exist');
    });
  });

  describe('logic', () => {
    it('should be enabled more than 15 seconds are played', () => {
      assert(requestPlaytime.toString(), () => {
        cy.query('step-backward').should('not.be.disabled');
      });

      dispatch(requestPlaytime(15000));
    });

    it('should jump 15 seconds back', (done) => {
      cy.bootstrap('<step-backward></step-backward>', [{ playtime: 15000 }]).then((app) => {
        onUpdate(app, requestPlaytime.toString(), (_, { payload }) => {
          expect(payload).to.equal(0);
          done();
        });
        cy.query('step-backward').click();
      });
    });
  });
});
