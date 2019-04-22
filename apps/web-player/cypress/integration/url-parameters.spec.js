describe('Url Parameters', () => {
  beforeEach(cy.bootstrap)

  describe('Start Time', () => {
    beforeEach(function() {
      cy.embed(Object.assign({}, this.episode, this.audio, this.show, this.chapters), {
        t: '00:02'
      })
    })

    it('should show the play button', () => {
      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
    })

    it('should start the player at a given time', () => {
      cy.get('iframe')
        .iframe()
        .find('#progress-bar--timer-current')
        .contains('00:02')
    })
  })

  describe('End Time', () => {
    beforeEach(function() {
      cy.embed(Object.assign({}, this.episode, this.audio, this.show, this.chapters), {
        t: '00:01,00:02'
      })
    })

    it('should show the play button', () => {
      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
    })

    it('should start the player at a given time', () => {
      cy.get('iframe')
        .iframe()
        .find('#progress-bar--timer-current')
        .contains('00:01')
    })

    it('should end the player at a given time', () => {
      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()
      cy.wait(2000)
      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
      cy.get('iframe')
        .iframe()
        .find('#progress-bar--timer-current')
        .contains('00:02')
    })
  })

  describe('Autoplay', () => {
    beforeEach(function() {
      cy.embed(Object.assign({}, this.episode, this.audio, this.show, this.chapters), {
        autoplay: true
      })
    })

    it('should play the episode instantly', () => {
      cy.get('iframe')
        .iframe()
        .find('#play-button--pause')
    })
  })
})
