import { toggleTab } from '@podlove/player-actions/tabs';
import { onUpdate } from '../helpers/state.js';

describe('<tab>', () => {
  let assert, dispatch;

  beforeEach(function () {
    cy.bootstrap('<tab name="shownotes"><div>My Tab Content</div></tab>', []).then((app) => {
      assert = onUpdate(app);
      dispatch = app.dispatch;
    });
  });

  describe('render', () => {
    it('should render when active', (done) => {
      assert(toggleTab.toString(), () => {
        cy.query('tab').should('exist');
        done();
      });

      dispatch(toggleTab('shownotes'));
    });

    it('should not render when active', (done) => {
      assert(toggleTab.toString(), () => {
        cy.query('tab').should('not.exist');
        done();
      });

      dispatch(toggleTab('other-tab' as any));
    });
  });
});
