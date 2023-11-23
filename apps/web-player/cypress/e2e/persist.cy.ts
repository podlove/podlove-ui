import { backendPlaytime } from '@podlove/player-actions/timepiece';
import { onUpdate } from '../helpers/state.js';
import storage from '../helpers/storage.js';
import { toggleTab } from '@podlove/player-actions/tabs';
import { PodloveWebPlayerConfig, PodloveWebPlayerTab } from '@podlove/types';
import { loadQuantiles } from '@podlove/player-actions/quantiles';

import config from '../../public/podcast/config.json';

describe('persist', () => {
  let assert, store;
  beforeEach(() => {
    cy.embed({
      episode: '/podcast/episode.json',
      config: {...config, activeTab: 'none'} as PodloveWebPlayerConfig
    }).then(({ player }) => {
      assert = onUpdate(player.store);
      store = player.store;
    });
  });

  describe('playtime', () => {
    it('should persist the playtime', (done) => {
      assert(backendPlaytime.toString(), () => {
        // throttled time
        cy.wait(1000);

        storage.getItem('playtime').then((val) => {
          expect(val).to.equal(1000);
          done();
        });
      });

      store.dispatch(backendPlaytime(1000));
    });

    it('should restore the persisted playtime', (done) => {
      store.dispatch(backendPlaytime(1000));

      // throttled time
      cy.wait(1000);

      cy.embed({
        episode: '/podcast/episode.json',
        config: {...config, activeTab: 'none'} as PodloveWebPlayerConfig
      }).then(({ player }) => {
        expect(player.store.getState().timepiece.playtime).to.equal(1000);
        done();
      });
    });
  });

  describe('tabs', () => {
    const tabs: PodloveWebPlayerTab[] = ['files', 'playlist', 'chapters', 'transcripts', 'share'];

    tabs.forEach((tab) => {
      it(`should persist on ${tab} tab change`, (done) => {
        assert(toggleTab.toString(), () => {
          // throttled time
          cy.wait(1000);

          storage.getItem('tabs').then((val) => {
            expect(val[tab]).to.equal(true);
            done();
          });
        });

        store.dispatch(toggleTab(tab));
      });
    });
  });

  describe('quantiles', () => {
    it('should persist the quantiles', (done) => {
      assert(loadQuantiles.toString(), () => {
        // throttled time
        cy.wait(1000);

        storage.getItem('quantiles').then((val) => {
          expect(val).to.deep.equal([
            [0, 10],
            [100, 200]
          ]);
          done();
        });
      });

      store.dispatch(
        loadQuantiles([
          [0, 10],
          [100, 200]
        ])
      );
    });

    it('should restore the persisted quantiles', () => {
      store.dispatch(
        loadQuantiles([
          [0, 10],
          [100, 200]
        ])
      );

      // throttled time
      cy.wait(1000);

      cy.embed({
        episode: '/podcast/episode.json',
        config: {...config, activeTab: 'none'} as PodloveWebPlayerConfig
      }).then(({ player }) => {
        expect(player.store.getState().quantiles).to.deep.equal([
          [0, 10],
          [100, 200]
        ]);
      });
    });
  });
});
