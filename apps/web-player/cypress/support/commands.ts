import { prop } from 'ramda';
import { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';
import { select } from '../helpers/selectors';

Cypress.Commands.add(
  'embed',
  (
    template: string,
    data: {
      episode: string | PodloveWebPlayerEpisode;
      config: string | PodloveWebPlayerConfig;
    },
    params?: { [key: string]: string | number }
  ) => {
    const query = Object.keys(params || {})
      .reduce((result, key) => [...result, `${key}=${params[key]}`], [])
      .join('&');

    cy.visit(`/test.html${query ? '?' + query : ''}`);
    cy.window().then((win: any) => win.BOOTSTRAP(template, data));
  }
);

Cypress.Commands.add('setup', async function () {
  this.episode = await fetch('/podcast/episode.json').then((data) => data.json());
  this.chapters = await fetch('/podcast/chapters.json').then((data) => data.json());
  this.transcripts = await fetch('/podcast/transcripts.json').then((data) => data.json());
  this.playlist = await fetch('/podcast/playlist.json').then((data) => data.json());
  this.config = await fetch('/podcast/config.json').then((data) => data.json());
});

Cypress.Commands.add('query', (selector: string) => cy.get(select(selector)));

Cypress.Commands.add('share', (data: { episode: string; config: string }, params = {}): any => {
  const urlParams = { ...params, ...data };

  const query = Object.keys(urlParams)
    .reduce((result, key) => [...result, `${key}=${urlParams[key]}`], [])
    .join('&');

  cy.visit(`/share.html${query ? '?' + query : ''}`);

  cy.window().its('PODLOVE_APP').should('exist');

  return cy.window().then(prop('PODLOVE_APP'));
});
