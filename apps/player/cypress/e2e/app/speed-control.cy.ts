import { setRate } from '@podlove/player-actions/audio';
import { onUpdate } from '../../helpers/state.js';

describe('<speed-control>', () => {
  let assert, dispatch;

  beforeEach(() => {
    cy.app('<speed-control></speed-control>').then((app) => {
      assert = onUpdate(app);
      dispatch = app.dispatch;
    });
  });

  describe('render', () => {
    it('should render', () => {
      cy.query('speed-control').should('exist');
    });

    const rates = [
      {
        speed: 0.5,
        icon: '050'
      },
      {
        speed: 0.75,
        icon: '075'
      },
      {
        speed: 1,
        icon: '100'
      },
      {
        speed: 1.25,
        icon: '125'
      },
      {
        speed: 1.5,
        icon: '150'
      },
      {
        speed: 1.75,
        icon: '175'
      },
      {
        speed: 2.0,
        icon: '200'
      }
    ];
    rates.forEach(({ speed, icon }) => {
      it(`should show ${speed} rate`, () => {
        assert('PLAYER_SET_RATE', () => {
          cy.query(`speed-control--speed-${icon}`);
        });

        dispatch({ type: 'PLAYER_SET_RATE', payload: speed });
      });
    });
  });

  describe('logic', () => {
    const rates: [number, { speed: number; icon: string }][] = [
      [0.5, { speed: 0.75, icon: '075' }],
      [0.75, { speed: 1, icon: '100' }],
      [1, { speed: 1.25, icon: '125' }],
      [1.25, { speed: 1.5, icon: '150' }],
      [1.5, { speed: 1.75, icon: '175' }],
      [1.75, { speed: 2.0, icon: '200' }],
      [2.0, { speed: 0.5, icon: '050' }]
    ];

    rates.forEach(([current, { speed, icon }]) => {
      it(`should increment from ${current} to ${speed}`, () => {
        assert(setRate.toString(), () => {
          cy.query('speed-control').click();
          cy.query(`speed-control--speed-${icon}`);
        });

        dispatch(setRate(current));
      });
    });
  });
});
