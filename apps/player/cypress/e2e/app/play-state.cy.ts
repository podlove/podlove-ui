import { constructed, restore } from '@podlove/player-actions/lifecycle';
import audio from '../../fixtures/audio.json';
import { onUpdate } from '../../helpers/state.js';
import { backendEnd, backendLoadingEnd } from '@podlove/player-actions/play';
import { backendPlaytime } from '@podlove/player-actions/timepiece';

describe('<play-state>', () => {
  describe('initialized', () => {
    let assert, dispatch;

    beforeEach(() => {
      cy.app(
        `
        <play-state on="initialized">
          <div style="background: red; width: 50px; height: 50px;" data-test="play-state"></div>
        </play-state>`,
        [audio]
      ).then((store) => {
        assert = onUpdate(store);
        dispatch = store.dispatch;
      });
    });

    it(`should render on ${constructed.toString()}`, () => {
      assert(constructed.toString(), () => {
        cy.query('play-state').should('exist');
      });

      dispatch(constructed({} as any));
    });

    it(`should not render on ${backendLoadingEnd.toString()}`, () => {
      assert(backendLoadingEnd.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(backendLoadingEnd({} as any));
    });

    it(`should not render on ${backendPlaytime.toString()}`, () => {
      assert(backendPlaytime.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(backendPlaytime({} as any));
    });

    it(`should not render on ${restore.toString()}`, () => {
      assert(restore.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(restore());
    });

    it(`should not render on ${backendEnd.toString()}`, () => {
      assert(backendEnd.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(backendEnd());
    });
  });

  describe('active', () => {
    let assert, dispatch;

    beforeEach(() => {
      cy.app(
        `
        <play-state on="active">
          <div style="background: red; width: 50px; height: 50px;" data-test="play-state"></div>
        </play-state>`,
        [audio]
      ).then((store) => {
        assert = onUpdate(store);
        dispatch = store.dispatch;
      });
    });

    it(`should not render on ${constructed.toString()}`, () => {
      assert(constructed.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(constructed({} as any));
    });

    it(`should render on ${backendLoadingEnd.toString()}`, () => {
      assert(backendLoadingEnd.toString(), () => {
        cy.query('play-state').should('exist');
      });

      dispatch(backendLoadingEnd({} as any));
    });

    it(`should render on ${backendPlaytime.toString()}`, () => {
      assert(backendPlaytime.toString(), () => {
        cy.query('play-state').should('exist');
      });

      dispatch(backendPlaytime(10));
    });

    it(`should render on ${restore.toString()}`, () => {
      assert(restore.toString(), () => {
        cy.query('play-state').should('exist');
      });

      dispatch(restore());
    });

    it(`should not render on ${backendEnd.toString()}`, () => {
      assert(backendEnd.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(backendEnd());
    });
  });

  describe('ended', () => {
    let assert, dispatch;

    beforeEach(() => {
      cy.app(
        `
        <play-state on="ended">
          <div style="background: red; width: 50px; height: 50px;" data-test="play-state"></div>
        </play-state>`,
        [audio]
      ).then((store) => {
        assert = onUpdate(store);
        dispatch = store.dispatch;
      });
    });

    it(`should not render on ${constructed.toString()}`, () => {
      assert(constructed.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(constructed({} as any));
    });

    it(`should not render on ${backendLoadingEnd.toString()}`, () => {
      assert(backendLoadingEnd.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(backendLoadingEnd({} as any));
    });

    it(`should not render on ${backendPlaytime.toString()}`, () => {
      assert(backendPlaytime.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(backendPlaytime({} as any));
    });

    it(`should not render on ${restore.toString()}`, () => {
      assert(restore.toString(), () => {
        cy.query('play-state').should('not.exist');
      });

      dispatch(restore());
    });

    it(`should not render on ${backendEnd.toString()}`, () => {
      assert(backendEnd.toString(), () => {
        cy.query('play-state').should('exist');
      });

      dispatch(backendEnd());
    });
  });
});

