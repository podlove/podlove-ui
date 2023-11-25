import { inlineStyle } from '../../helpers/css.js';

describe('<tab-overflow>', () => {
  describe('render', () => {
    beforeEach(() => {
      cy.app(
        `<tab-overflow style="${inlineStyle({
          width: '400px',
          '--podlove-player--tab-overflow--start': 'rgba(255, 0, 0, 1)',
          '--podlove-player--tab-overflow--stop': 'rgba(255, 0, 0, 0)'
        })}"></tab-overflow>`
      );
    });

    it('should render', () => {
      cy.query('tab-overflow').should('exist');
    });

    it('should set the correct style', () => {
      cy.query('tab-overflow').should(
        'have.css',
        'background-image',
        'linear-gradient(rgb(255, 0, 0), rgba(255, 0, 0, 0))'
      );
    });
  });
});
