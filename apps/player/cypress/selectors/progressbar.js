module.exports = cy => ({
  timers: {
    left: () => cy.get('#progress-bar--timer-left'),
    current: () => cy.get('#progress-bar--timer-current')
  },
  chapter: {
    current: () => cy.get('#progress-bar--current-chapter'),
    title: () => cy.get('#progress-bar--current-chapter .title')
  },
  progress: {
    bar: () => cy.get('#progress-bar'),
    range: () => cy.get('#progress-bar .progress-range'),
    chapters: () => cy.get('#progress-bar .chapters-progress .indicator')
  }
})
