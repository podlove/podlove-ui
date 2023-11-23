import episode from '../../public/podcast/episode.json';
import config from '../../public/podcast/config.json';
import { PodloveWebPlayerConfig } from '@podlove/types';

describe('active tab', () => {
  describe('predefined tab', () => {
    it('should open the player with the configured tab', () => {
      cy.embed({
        episode: { ...episode, chapters: '/podcast/chapters.json' },
        config: config as PodloveWebPlayerConfig
      });

      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--chapters').should('exist');
      cy.query('tab-chapters').should('exist');
    });
  });

  describe('chapters', () => {
    it('should not query the chapters tab if no chapters are available', () => {
      cy.embed({
        episode: { ...episode, chapters: null },
        config: config as PodloveWebPlayerConfig
      });

      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--chapters').should('not.exist');
      cy.query('tab-chapters').should('not.exist');
    });
  });
});
