const components = exclude =>
  [
    'tabInfo',
    'tabChapters',
    'tabFiles',
    'tabAudio',
    'tabShare',
    'tabTranscripts',
    'poster',
    'showTitle',
    'episodeTitle',
    'subtitle',
    'progressbar',
    'controlSteppers',
    'controlChapters'
  ].filter(element => element !== exclude)

describe('Visible Components', () => {
  beforeEach(cy.bootstrap)

  describe('Default', () => {
    beforeEach(function() {
      cy.embed(Object.assign({}, this.episode, this.audio, this.show, this.chapters))
    })

    it('renders the info tab', function() {
      cy.get('iframe')
        .iframe()
        .find('#tabs [rel="info"]')
    })

    it('renders the chapters tab', function() {
      cy.get('iframe')
        .iframe()
        .find('#tabs [rel="chapters"]')
    })

    it('renders the audio tab', function() {
      cy.get('iframe')
        .iframe()
        .find('#tabs [rel="audio"]')
    })

    it('renders the files tab', function() {
      cy.get('iframe')
        .iframe()
        .find('#tabs [rel="files"]')
    })

    it('renders the share tab', function() {
      cy.get('iframe')
        .iframe()
        .find('#tabs [rel="share"]')
    })

    it('renders the header poster', function() {
      cy.get('iframe')
        .iframe()
        .find('#header-poster')
    })

    it('renders the show title', function() {
      cy.get('iframe')
        .iframe()
        .find('#header-showtitle')
    })

    it('renders the episode title', function() {
      cy.get('iframe')
        .iframe()
        .find('#header-title')
    })

    it('renders the subtitle', function() {
      cy.get('iframe')
        .iframe()
        .find('#header-subtitle')
    })

    it('renders the stepper controls', function() {
      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#stepper-button--forward')

      cy.get('iframe')
        .iframe()
        .find('#stepper-button--backwards')
    })

    it('renders the chapter controls', function() {
      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#chapter-button--next')

      cy.get('iframe')
        .iframe()
        .find('#chapter-button--previous')
    })

    it('renders the progressbar', function() {
      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#progress-bar')
    })
  })

  describe('Tabs', () => {
    ;[
      {
        tab: 'info',
        key: 'tabInfo'
      },
      {
        tab: 'chapters',
        key: 'tabChapters'
      },
      {
        tab: 'files',
        key: 'tabFiles'
      },
      {
        tab: 'audio',
        key: 'tabAudio'
      },
      {
        tab: 'share',
        key: 'tabShare'
      },
      {
        tab: 'transcripts',
        key: 'tabTranscripts'
      }
    ].forEach(item => {
      it(`hides the ${item.tab} tab if '${item.key}' is not specified`, function() {
        cy.embed(
          Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
            visibleComponents: components(item.key)
          })
        )

        cy.get('iframe')
          .iframe()
          .find(`#tabs [rel="${item.tab}"]`)
          .should('not.exist')
      })
    })
  })

  describe('Header', () => {
    it(`hides the Poster if 'poster' is not specified`, function() {
      cy.embed(
        Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
          visibleComponents: components('poster')
        })
      )

      cy.get('iframe')
        .iframe()
        .find('#header-poster')
        .should('not.exist')
    })

    it(`hides the Show Title if 'showTitle' is not specified`, function() {
      cy.embed(
        Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
          visibleComponents: components('showTitle')
        })
      )

      cy.get('iframe')
        .iframe()
        .find('#header-showtitle')
        .should('not.exist')
    })

    it(`hides the Episode Title if 'episodeTitle' is not specified`, function() {
      cy.embed(
        Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
          visibleComponents: components('episodeTitle')
        })
      )

      cy.get('iframe')
        .iframe()
        .find('#header-title')
        .should('not.exist')
    })

    it(`hides the Subtitle if 'subtitle' is not specified`, function() {
      cy.embed(
        Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
          visibleComponents: components('subtitle')
        })
      )

      cy.get('iframe')
        .iframe()
        .find('#header-subtitle')
        .should('not.exist')
    })
  })

  describe('Controllbar', () => {
    it(`hides the stepper controls if 'controlSteppers' is not specified`, function() {
      cy.embed(
        Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
          visibleComponents: components('controlSteppers')
        })
      )

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#stepper-button--forward')
        .should('not.exist')

      cy.get('iframe')
        .iframe()
        .find('#stepper-button--backwards')
        .should('not.exist')
    })

    it(`hides the chapter controls if 'controlChapters' is not specified`, function() {
      cy.embed(
        Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
          visibleComponents: components('controlChapters')
        })
      )

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#chapter-button--next')
        .should('not.exist')

      cy.get('iframe')
        .iframe()
        .find('#chapter-button--previous')
        .should('not.exist')
    })
  })

  /*
  'progressbar'
  */
  describe('Progressbar', () => {
    it(`hides the progressbar if 'progressbar' is not specified`, function() {
      cy.embed(
        Object.assign({}, this.episode, this.audio, this.show, this.chapters, {
          visibleComponents: components('progressbar')
        })
      )

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#play-button--play')
        .click()

      cy.get('iframe')
        .iframe()
        .find('#progress-bar')
        .should('not.exist')
    })
  })
})
