describe('templating', () => {
  describe('variants', () => {
    it('should load the xl variant by default', () => {
      cy.embed('<div></div>', { episode: '/podcast/episode.json', config: '/podcast/config.json' });
      cy.query('player--xl').should('exist');
    });

    it('should load the l variant', () => {
      cy.embed('<div data-variant="l"></div>', {
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      });
      cy.query('player--l').should('exist');
    });

    it('should load the m variant', () => {
      cy.embed('<div data-variant="m"></div>', {
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      });
      cy.query('player--m').should('exist');
    });
  });

  describe('template', () => {
    it('should accept a custom template reference', () => {
      cy.embed('<div data-template="/podcast/custom-template.html"></div>', {
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      });
      cy.query('player--custom').should('exist');
    });

    it('should use the inner content as a template when no template or variant is declared', () => {
      cy.embed(
        `<div>
        <div data-test="player--custom">
          <play-button></play-button>
        </div>
      </div>`,
        { episode: '/podcast/episode.json', config: '/podcast/config.json' }
      );
      cy.query('player--custom').should('exist');
    });

    it('should prefer a template over a variant', () => {
      cy.embed('<div data-variant="m" data-template="/podcast/custom-template.html"></div>', {
        episode: '/podcast/episode.json',
        config: '/podcast/config.json'
      });
      cy.query('player--custom').should('exist');
      cy.query('player--m').should('not.exist');
    });
  });
});
