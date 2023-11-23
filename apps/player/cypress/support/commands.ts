import { Store } from 'redux';
import { select } from '../helpers/selectors.js';

Cypress.Commands.add(
  'bootstrap',
  (template: string = '', stateFragments?: any[]): Promise<Store> => {
    const state = (stateFragments || []).reduce(
      (result, item) => Object.assign({}, result, item),
      {}
    );
    cy.visit('/test.html');
    cy.get('#test').should('exist');
    return cy
      .url()
      .should('include', '/test.html')
      .then(() =>
        cy.window().then((win) => (win as any).BOOTSTRAP(template, state))

      ) as unknown as Promise<Store>;
  }
);

Cypress.Commands.add('query', (selector, ...query) =>
  cy.get([select(selector), ...(query || [])].join(''))
);
