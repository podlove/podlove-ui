import { PodloveWebPlayerConfig } from '@podlove/types';
import episode from '../../public/podcast/episode.json';
import config from '../../public/podcast/config.json';
import playlist from '../../public/podcast/playlist.json';
import transcripts from '../../public/podcast/transcripts.json';
import chapters from '../../public/podcast/chapters.json';

describe('config parsing', () => {
  describe('chapters', () => {
    it('should resolve chapters from an url', () => {
      cy.embed({
        episode: { ...episode, chapters: '/podcast/chapters.json' },
        config: '/podcast/config.json'
      });

      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--chapters').should('exist');
    });

    it('should resolve chapters from the episode', () => {
      cy.embed({
        episode: { ...episode, chapters },
        config: '/podcast/config.json'
      });
      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--chapters').should('exist');
    });
  });

  describe('transcripts', () => {
    it('should resolve transcripts from an url', () => {
      cy.embed({
        episode: { ...episode, transcripts: '/podcast/transcripts.json' },
        config: '/podcast/config.json'
      });

      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--transcripts').should('exist');
    });

    it('should resolve transcripts from the config', () => {
      cy.embed({
        episode: { ...episode, transcripts },
        config: '/podcast/config.json'
      });

      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--transcripts').should('exist');
    });
  });

  describe('playlist', () => {
    it('should resolve playlist from an url', () => {
      cy.embed({
        episode: '/podcast/episode.json',
        config: { ...config, playlist: '/podcast/playlist.json' } as PodloveWebPlayerConfig
      });
      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--playlist').should('exist');
    });

    it('should resolve playlist from the config', () => {
      cy.embed({
        episode: '/podcast/episode.json',
        config: { ...config, playlist } as PodloveWebPlayerConfig
      });
      cy.query('player--xl').should('exist');
      cy.query('tab-trigger--playlist').should('exist');
    });
  });

  describe('active tab', () => {
    const tabs = ['chapters', 'transcripts', 'files', 'playlist', 'share'];

    tabs.forEach((tab) => {
      it(`should make the ${tab} tab active`, () => {
        cy.embed({
          episode: '/podcast/episode.json',
          config: { ...config, activeTab: tab } as PodloveWebPlayerConfig
        });

        cy.query('player--xl').should('exist');
        cy.query(`tab-${tab}`).should('exist');
      });
    });
  });
});
