import { onUpdate } from '../../helpers/state.js';
import episode from '../../fixtures/episode.json';
import { requestPlaytime } from '@podlove/player-actions/timepiece';

describe('<step-forward>', () => {
  let assert, dispatch;

  beforeEach(() => {
    cy.app('<step-forward></step-forward>', [episode]).then((app) => {
      assert = onUpdate(app);
      dispatch = app.dispatch;
    });
  });

  describe('render', () => {
    it('should render', () => {
      cy.query('step-forward').should('exist');
    });
  });

  describe('logic', () => {
    it('should be enabled more than 30 seconds are left', () => {
      assert(requestPlaytime.toString(), () => {
        cy.query('step-forward').should('not.be.disabled');
      });

      dispatch(requestPlaytime(0));
    });

    it('should jump 30 seconds forward', (done) => {
      cy.app('<step-forward></step-forward>', [{ playtime: 0, duration: 60000 }]).then(
        (app) => {
          onUpdate(app, requestPlaytime.toString(), (_, { payload }) => {
            expect(payload).to.equal(30000);
            done();
          });
          cy.query('step-forward').click();
        }
      );
    });
  });
});
