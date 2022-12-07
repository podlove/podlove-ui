const { select } = require('../helpers/selectors')

Cypress.Commands.add('setup', () => {
  cy.fixture('episode').as('episode')
  cy.fixture('show').as('show')
  cy.fixture('audio').as('audio')
  cy.fixture('chapters').as('chapters')
  cy.fixture('contributors').as('contributors')
  cy.fixture('runtime').as('runtime')
  cy.fixture('files').as('files')
  cy.fixture('theme').as('theme')
  cy.fixture('subscribe-button').as('subscribeButton')
  cy.fixture('playlist').as('playlist')
  cy.fixture('reference').as('reference')
  cy.fixture('transcripts').as('transcripts')
  cy.fixture('share').as('share')
})

Cypress.Commands.add('bootstrap', (template = '', stateFragments = []) => {
  const state = stateFragments.reduce((result, item) => Object.assign({}, result, item), {})
  cy.visit('/test.html')
  cy.url()
    .should('include', '/test.html')
    .then(() => cy.window().then((win) => win.BOOTSTRAP(template, state)))
})

Cypress.Commands.add('select', (selector, ...query) =>
  cy.get([select(selector), ...(query || [])].join(''))
)
