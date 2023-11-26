import { Store } from 'redux';
import { select } from '../helpers/selectors.js';
import { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';

Cypress.Commands.add('app', (template: string = '', stateFragments?: any[]): Promise<Store> => {
  const state = (stateFragments || []).reduce(
    (result, item) => Object.assign({}, result, item),
    {}
  );
  cy.visit('/test.html');
  cy.get('#test').should('exist');

  return cy
    .window()
    .its('BOOTSTRAP_APP')
    .should('exist')
    .then((bootstrap) => bootstrap(template, state)) as unknown as Promise<Store>;
});

Cypress.Commands.add('query', (selector, ...query) =>
  cy.get([select(selector), ...(query || [])].join(''))
);

Cypress.Commands.add(
  'embed',
  (
    {
      episode,
      config,
      variant,
      template,
      templateUrl
    }: {
      episode: string | PodloveWebPlayerEpisode;
      config: string | PodloveWebPlayerConfig;
      variant?: string;
      template?: string;
      templateUrl?: string;
    },
    params?: { [key: string]: string | number }
  ): Promise<{ player: { app: any; store: any }; subscribeButton: { app: any; store: any } }> => {
    const query = Object.keys(params || {})
      .reduce((result, key) => [...result, `${key}=${params[key]}`], [])
      .join('&');

    cy.visit(`/test.html${query ? '?' + query : ''}`);

    return cy
      .window()
      .its('BOOTSTRAP_WEB_COMPONENT')
      .should('exist')
      .then((bootstrap) =>
        bootstrap({ episode, config, variant, template, templateUrl })
      ) as unknown as Promise<{
      player: { app: any; store: any };
      subscribeButton: { app: any; store: any };
    }>;
  }
);

Cypress.Commands.add('share', (data: { episode: string; config: string }, params = {}): any => {
  const urlParams = { ...params, ...data };

  const query = Object.keys(urlParams)
    .reduce((result, key) => [...result, `${key}=${urlParams[key]}`], [])
    .join('&');

  cy.visit(`/share.html${query ? '?' + query : ''}`);
  cy.get('#app').should('exist');
  return cy.window().its('PODLOVE_APP').should('exist');
});
