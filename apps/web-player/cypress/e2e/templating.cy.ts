describe('templating', () => {
  describe('variants', () => {
    it('should load the xl variant by default', () => {
      cy.embed({ episode: '/podcast/episode.json', config: '/podcast/config.json' });
      cy.query('player--xl').should('exist');
    });

    it('should load the l variant', () => {
      cy.embed({
        variant: 'l',
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      });
      cy.query('player--l').should('exist');
    });

    it('should load the m variant', () => {
      cy.embed({
        variant: 'm',
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      });
      cy.query('player--m').should('exist');
    });
  });

  describe('template', () => {
    it('should accept a custom template reference', () => {
      cy.embed({
        episode: '/podcast/episode.json',
        config: '/podcast/config.json',
        templateUrl: '/podcast/custom-template.html'
      });
      cy.query('player--custom').should('exist');
    });

    it('should use the inner content as a template when no template or variant is declared', () => {
      cy.embed(
        { episode: '/podcast/episode.json', config: '/podcast/config.json', template: '<div data-test="player--custom"><play-button></play-button></div>' }
      );
      cy.query('player--custom').should('exist');
    });

    it('should prefer a template over a variant', () => {
      cy.embed({
        templateUrl: '/podcast/custom-template.html',
        variant: 'm',
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      });
      cy.query('player--custom').should('exist');
      cy.query('player--m').should('not.exist');
    });
  });
});
