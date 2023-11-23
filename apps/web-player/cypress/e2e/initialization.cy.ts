describe('Initialization', () => {
  it('should initialize with episode and a configuration', () => {
    cy.embed({ episode: '/podcast/episode.json', config: '/podcast/config.json' });
    cy.query('player--xl').should('exist');
  });

  it('should initialize with a missing configuration', () => {
    cy.embed({ episode: '/podcast/episode.json', config: '' });
    cy.query('player--xl').should('exist');
  });
});
