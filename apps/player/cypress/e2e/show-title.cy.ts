import { inlineStyle } from '../helpers/css.js';
import show from '../fixtures/show.json';
import theme from '../fixtures/theme.json';

describe('<show-title>', () => {
  describe('render', () => {
    it('should render', () => {
      cy.bootstrap('<show-title></show-title>', [show]);
      cy.query('show-title').should('exist');
    });

    it('should set the font', () => {
      cy.bootstrap(
        `<show-title style="${inlineStyle({
          '--podlove-player--show-title--color': theme.tokens.contrast
        })}"></show-title>`,
        [show, { version: 5, theme }]
      );
      cy.query('show-title').should('have.css', 'font-family', 'boldFont');
      cy.query('show-title').should('have.css', 'color', 'rgb(0, 0, 0)');
    });
  });

  describe('logic', () => {
    it('should render just the text if no link is available', () => {
      cy.bootstrap('<show-title></show-title>', [{ title: show.show.title }]);
      cy.query('show-title--link').should('not.exist');
      cy.query('show-title--text').should('exist');
    });

    it('should render the show link if available', () => {
      cy.bootstrap('<show-title></show-title>', [show]);
      cy.query('show-title--link').should('have.attr', 'href', 'http://link/to/show');
    });

    it('should render the target to _parent when in native mode', () => {
      cy.bootstrap('<show-title></show-title>', [show]);
      cy.query('show-title--link').should('have.attr', 'target', '_parent');
    });
  });
});
