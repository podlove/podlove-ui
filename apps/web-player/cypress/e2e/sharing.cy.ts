import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { onUpdate } from '../helpers/state.js';

describe('sharing', () => {
  it('should generate the correct embed code', () => {
    cy.embed({ episode: '/podcast/episode.json', config: '/podcast/config.json' });
    cy.query('tab-trigger--share').click();
    cy.query('tab-share--embed--input').should('exist');
    cy.query('tab-share--embed--input').then((input) => {
      expect(input.val()).to.include('title="Podlove Web Player: Podlovers - Podlove Web Player"');
      expect(input.val()).to.include('height="200"');
      expect(input.val()).to.include(
        'share.html?config=%2Fpodcast%2Fconfig.json&episode=%2Fpodcast%2Fepisode.json'
      );
      expect(input.val()).to.include('frameborder="0" scrolling="no" tabindex="0"');
    });
  });

  it('should render the share template', () => {
    cy.share({ episode: '/podcast/episode.json', config: '/podcast/config.json' });
    cy.query('player--share').should('exist');
  });

  it('should parse the start time', (done) => {
    cy.share(
      {
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      },
      { t: '00:10' }
    ).then((player) => {
      onUpdate(player.store, requestPlaytime.toString(), (state) => {
        expect(state.timepiece.playtime).to.equal(10000);
        done();
      });
    });
  });
});
