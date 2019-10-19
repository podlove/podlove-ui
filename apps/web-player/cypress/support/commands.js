const { select } = require('../helpers/selectors')

Cypress.Commands.add('setup', async function() {
  this.episode = await fetch('/episode.json').then(data => data.json())
  this.chapters = await fetch('/chapters.json').then(data => data.json())
  this.transcripts = await fetch('/transcripts.json').then(data => data.json())
  this.playlist = await fetch('/playlist.json').then(data => data.json())
  this.config = await fetch('/test/config.json').then(data => data.json())
})

Cypress.Commands.add('embed', (template = '', { episode, config, params, context } = {}) => {
  const query = Object.keys(params || {})
    .reduce((result, key) => [...result, `${key}=${params[key]}`], [])
    .join('&')

  cy.visit(`/test/embed.html${query ? '?' + query : ''}`, {
    onBeforeLoad(win) {
      if (typeof context === 'function') {
        context(win)
      }
    }
  })

  cy.window().then(win => win.BOOTSTRAP(template, episode, config))
})

Cypress.Commands.add('share', ({ episode, config, params, context } = {}) => {
  const urlParams = { ...params, episode, config }

  const query = Object.keys(urlParams)
    .reduce((result, key) => [...result, `${key}=${urlParams[key]}`], [])
    .join('&')

  cy.visit(`/share.html${query ? '?' + query : ''}`, {
    onBeforeLoad(win) {
      if (typeof context === 'function') {
        context(win)
      }
    }
  })

  cy.window().then(win => win.PODLOVE_STORE)
})

Cypress.Commands.add('select', selector =>
  cy.get('iframe').then(iframe =>
    iframe
      .contents()
      .find('body')
      .find(select(selector))
  )
)
