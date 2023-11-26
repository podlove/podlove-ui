import { onUpdate } from '../../helpers/state.js';
import subscribeButton from '../../fixtures/subscribe-button.json';
import theme from '../../fixtures/theme.json';
import { inlineStyle } from '../../helpers/css.js';

describe('<subscribe-button>', () => {
  describe('render', () => {
    it('should render when configured', () => {
      cy.app('<subscribe-button></subscribe-button>', [subscribeButton]);
      cy.query('subscribe-button').should('exist');
    });

    it(`shouldn't render when not configured`, () => {
      cy.app('<subscribe-button></subscribe-button>', []);
      cy.query('subscribe-button').should('not.exist');
    });

    it(`should style the button`, () => {
      cy.app(
        `<subscribe-button style="${inlineStyle({
          '--podlove-player--subscribe-button--icon-color': 'red',
          '--podlove-player--subscribe-button--color': 'green',
          '--podlove-player--subscribe-button--border-color': 'yellow',
          '--podlove-player--subscribe-button--background': 'blue'
        })}"></subscribe-button>`,
        [{ theme, version: 5 }, subscribeButton]
      );
      cy.query('subscribe-button').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.query('subscribe-button').should('have.css', 'border-color', 'rgb(255, 255, 0)');
      cy.query('subscribe-button').should('have.css', 'background-color', 'rgb(0, 0, 255)');
      cy.query('subscribe-button').should('have.css', 'font-family', 'boldFont');
    });
  });

  describe('logic', () => {
    it('should dispatch the correct action on click', (done) => {
      cy.app('<subscribe-button></subscribe-button>', [subscribeButton]).then((app) => {
        onUpdate(app, 'BUTTON_SHOW_OVERLAY', () => done());
        cy.query('subscribe-button').click();
      });
    });
  });
});
