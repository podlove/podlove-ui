import { backendPlaytime } from '@podlove/player-actions/timepiece';
import { toggleTab } from '@podlove/player-actions/tabs';
import { PodloveWebPlayerConfig, PodloveWebPlayerTab } from '@podlove/types';
import { loadQuantiles } from '@podlove/player-actions/quantiles';
import { onUpdate } from '../../helpers/state.js';
import storage from '../../helpers/storage.js';

import config from '../../../public/config.json';

describe('persist', () => {
  let assert, store;
  beforeEach(() => {
    cy.embed({
      episode: 'episode.json',
      config: { ...config, activeTab: 'none' } as PodloveWebPlayerConfig
    }).then((result) => {
      assert = onUpdate(result);
      store = result;
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
        episode: 'episode.json',
        config: { ...config, activeTab: 'none' } as PodloveWebPlayerConfig
      }).then((store) => {
        expect(store.getState().timepiece.playtime).to.equal(1000);
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
        episode: 'episode.json',
        config: { ...config, activeTab: 'none' } as PodloveWebPlayerConfig
      }).then((store) => {
        expect(store.getState().quantiles).to.deep.equal([
          [0, 10],
          [100, 200]
        ]);
      });
    });
  });
});
