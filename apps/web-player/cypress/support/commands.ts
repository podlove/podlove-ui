import { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';
import { select } from '../helpers/selectors.js';

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
      .its('BOOTSTRAP')
      .should('exist')
      .then(async (bootstrap) => await bootstrap({ episode, config, variant, template, templateUrl })) as unknown as Promise<{
      player: { app: any; store: any };
      subscribeButton: { app: any; store: any };
    }>;
  }
);

Cypress.Commands.add('query', (selector: string) => cy.get(select(selector)));

Cypress.Commands.add('share', (data: { episode: string; config: string }, params = {}): any => {
  const urlParams = { ...params, ...data };

  const query = Object.keys(urlParams)
    .reduce((result, key) => [...result, `${key}=${urlParams[key]}`], [])
    .join('&');

  cy.visit(`/share.html${query ? '?' + query : ''}`);
  cy.get('#app').should('exist');
  return cy.window().its('PODLOVE_APP');
});
