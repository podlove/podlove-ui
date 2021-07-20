module.exports = (cy) => ({
  controls: {
    playButton: {
      loading: () => cy.get('#play-button--loading'),
      pause: () => cy.get('#play-button--pause'),
      play: () => cy.get('#play-button--play'),
      restart: () => cy.get('#play-button--restart')
    },
    steppers: {
      forward: () => cy.get('#stepper-button--forward'),
      back: () => cy.get('#stepper-button--backwards')
    },
    chapters: {
      next: () => cy.get('#chapter-button--next'),
      back: () => cy.get('#chapter-button--previous')
    }
  }
})
