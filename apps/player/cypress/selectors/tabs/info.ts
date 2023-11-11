export default (cy) => ({
  header: () => cy.get(`#tabs [rel="info"]`),
  container: () => cy.get('#tab-info'),
  episode: {
    title: () => cy.get('#tab-info--episode-title'),
    meta: () => cy.get('#tab-info--episode-meta'),
    subtitle: () => cy.get('#tab-info--episode-subtitle'),
    summary: () => cy.get('#tab-info--episode-summary'),
    link: () => cy.get('#tab-info--episode-link .link')
  },
  show: {
    title: () => cy.get('#tab-info--show-title'),
    poster: () => cy.get('#tab-info--show-poster .image'),
    summary: () => cy.get('#tab-info--show-summary'),
    link: () => cy.get('#tab-info--show-link .link')
  },
  contributors: () => cy.get('#tab-info--contributors')
})
