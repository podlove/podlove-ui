import {
  backendLiveSync,
  backendPlaytime,
  simulatePlaytime
} from '@podlove/player-actions/timepiece';
import { onUpdate } from '../helpers/state.js';
import episode from '../fixtures/episode.json';

describe('<timer-live>', () => {
  let dispatch;

  beforeEach(() => {
    cy.bootstrap('<timer-live></timer-live>', [episode]).then((app) => {
      dispatch = app.dispatch;
      assert = onUpdate(app);
    });
  });

  describe('render', () => {
    it('should render the live label', () => {
      dispatch(backendLiveSync(10000));
      dispatch(backendPlaytime(10000));
      cy.query('label-live').should('exist');
    });

    it('should render the live timer', () => {
      dispatch(backendLiveSync(10000));
      dispatch(backendPlaytime(4000));
      cy.query('timer-live').should('exist');
    });
  });

  describe('logic', () => {
    it('should show the timer if the livesync is less than 5 seconds away', () => {
      dispatch(backendLiveSync(10000));
      dispatch(backendPlaytime(4000));
      cy.query('timer-live').should('exist');
      cy.query('timer-live').should('contain', '-00:06');
    });

    it('should update on ghosttime change', () => {
      dispatch(backendLiveSync(10000));
      dispatch(simulatePlaytime(1000));
      cy.query('timer-live').should('exist');
      cy.query('timer-live').should('contain', '-00:10');
    });
  });
});
