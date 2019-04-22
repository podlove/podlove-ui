const domSelectors = require('../selectors')

Cypress.Commands.add('bootstrap', () => {
  cy.visit('/test.html')
  cy.fixture('episode').as('episode')
  cy.fixture('show').as('show')
  cy.fixture('audio').as('audio')
  cy.fixture('chapters').as('chapters')
  cy.fixture('contributors').as('contributors')
  cy.fixture('reference').as('reference')
  cy.fixture('runtime').as('runtime')
  cy.fixture('files').as('files')
})

Cypress.Commands.add('play', () => {
  const selectors = domSelectors(cy)
  selectors.controls.playButton.play().click()
  selectors.controls.playButton.pause()
})

Cypress.Commands.add('pause', () => {
  const selectors = domSelectors(cy)

  selectors.controls.playButton.pause().click()
  selectors.controls.playButton.play()
})

Cypress.Commands.add('tab', tab => {
  const selectors = domSelectors(cy)
  selectors.tabs[tab].header().click()
  selectors.tabs[tab].container()
})
