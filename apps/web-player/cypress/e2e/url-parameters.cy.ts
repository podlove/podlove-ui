describe('url-parameters', () => {
  describe('start time', () => {
    let store;

    beforeEach(() => {
      cy.embed(
        {
          episode: '/podcast/episode.json',
          config: '/podcast/config.json'
        },
        { t: '00:02' }
      ).then(({ player }) => {
        store = player.store;
      });
    });

    it('should set the start time', () => {
      expect(store.getState().timepiece.playtime).to.equal(2000);
    });
  });

  describe('end time', () => {
    let store;

    beforeEach(() => {
      cy.embed({
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'},
        { t: '00:01,00:02' }
      ).then(({ player }) => {
        store = player.store;
      });
    });

    it('should set the start time', () => {
      expect(store.getState().timepiece.playtime).to.equal(1000);
    });

    it.skip('should stop at the given time', () => {
      // can't be tested woth browser limitations
      cy.query('play-button').click();

      cy.wait(10000).then(() => {
        expect(store.getState().timepiece.playtime).to.be.lt(4000);
        expect(store.getState().timepiece.playtime).to.be.gt(2000);
      });
    });
  });

  describe('autoplay', () => {
    let store;

    beforeEach(() => {
      cy.embed({
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'},
        { autoplay: true }
      ).then(({ player }) => {
        store = player.store;
      });
    });

    it.skip('should dispatch the play action on start', () => {
      // can't be tested woth browser limitations
      cy.get('html').realClick();
      cy.wait(5000).then(() => {
        expect(store.getState().timepiece.playtime).to.be.gt(0);
      });
    });
  });
});
