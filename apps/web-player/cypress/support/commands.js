Cypress.Commands.add('bootstrap', () => {
  cy.visit('/test.html')
  cy.fixture('episode').as('episode')
  cy.fixture('show').as('show')
  cy.fixture('audio').as('audio')
  cy.fixture('chapters').as('chapters')
  cy.fixture('contributors').as('contributors')
  cy.fixture('reference').as('reference')
  cy.fixture('runtime').as('runtime')
})

Cypress.Commands.add('embed', (config = {}, params = {}) => {
  const query = Object.keys(params)
    .reduce((result, key) => [...result, `${key}=${params[key]}`], [])
    .join('&')

  cy.visit(`/test.html${query ? '?' + query : ''}`)

  cy.window().then(win => {
    win.podlovePlayer('#podlove-player', config)
  })
})

Cypress.Commands.add(
  'iframe',
  {
    prevSubject: 'element'
  },
  $iframe => {
    return new Cypress.Promise(resolve => {
      resolve($iframe.contents().find('body'))
    })
  }
)
