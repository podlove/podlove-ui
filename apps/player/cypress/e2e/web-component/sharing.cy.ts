describe('sharing', () => {
  it('should generate the correct embed code', () => {
    cy.embed({ episode: 'episode.json', config: 'config.json' });
    cy.query('tab-trigger--share').click();
    cy.query('tab-share--embed--input').should('exist');
    cy.query('tab-share--embed--input').then((input) => {
      expect(input.val()).to.include('title="Podlove Web Player: Podlovers - Podlove Web Player"');
      expect(input.val()).to.include('height="200"');
      expect(input.val()).to.include('share.html?config=config.json&episode=episode.json');
      expect(input.val()).to.include('frameborder="0" scrolling="no" tabindex="0"');
    });
  });

  it('should render the share template', () => {
    cy.share({ episode: 'episode.json', config: 'config.json' });
    cy.query('player--share').should('exist');
  });

  it('should parse the start time', () => {
    cy.share(
      {
        episode: 'episode.json',
        config: 'config.json'
      },
      { t: '00:10' }
    ).then((store) => {
      expect(store.getState().timepiece.playtime).to.equal(10000);
    });
  });
});
