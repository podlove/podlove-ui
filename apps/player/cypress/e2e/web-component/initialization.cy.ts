describe('Initialization', () => {
  it('should initialize with episode and a configuration', () => {
    cy.embed({ episode: 'episode.json', config: 'config.json' });
    cy.query('player--xl').should('exist');
  });

  it('should initialize with a missing configuration', () => {
    cy.embed({ episode: 'episode.json', config: '' });
    cy.query('player--xl').should('exist');
  });
});
