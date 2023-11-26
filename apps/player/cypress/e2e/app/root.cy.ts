import { inlineStyle } from '../../helpers/css.js';
import theme from '../../fixtures/theme.json';

describe('<root>', () => {
  beforeEach(() => {
    const styles = inlineStyle({
      width: '250px',
      height: '250px'
    });
    cy.app(`<root style="${styles}"><div data-test="inner">Inner Element</div></root>`, [
      { version: 5, theme }
    ]);
  });

  describe('render', () => {
    it('should render the root element', () => {
      cy.query('root').should('exist');
    });

    it('should set the correct background color', () => {
      cy.query('root').should('have.css', 'background-color', 'rgb(233, 241, 245)');
    });

    it('should set the correct font', () => {
      cy.query('root').should('have.css', 'font-family', 'regularFont');
      cy.query('root').should('have.css', 'font-weight', '300');
    });
  });

  describe('slot', () => {
    it('should show the slot content', () => {
      cy.query('inner').should('exist');
    });
  });
});
