describe('url-parameters', () => {
  beforeEach(cy.setup)

  describe('start time', () => {
    let store

    beforeEach(() => {
      cy.embed('<div></div>', { episode: '/episode.json', config: '/test/config.json', params: { t: '00:02' }}).then(app => {
        store = app
      })
    })

    it('should set the start time', () => {
      expect(store.getState().timepiece.playtime).to.equal(2000)
    })
  })

  describe('end time', () => {
    let store

    beforeEach(() => {
      cy.embed('<div></div>', { episode: '/test/episode.json', config: '/test/config.json', params: { t: '00:01,00:02' }}).then(app => {
        store = app
      })
    })

    it('should set the start time', () => {
      expect(store.getState().timepiece.playtime).to.equal(1000)
    })

    it('should stop at the given time', () => {
      store.dispatch({ type: 'PLAYER_REQUEST_PLAY' })

      cy.wait(10000).then(() => {
        expect(store.getState().timepiece.playtime).to.be.lt(4000)
        expect(store.getState().timepiece.playtime).to.be.gt(2000)
      })
    })
  })

  describe('autoplay', () => {
    let store

    beforeEach(() => {
      cy.embed('<div></div>', { episode: '/test/episode.json', config: '/test/config.json', params: { autoplay: true }}).then(app => {
        store = app
      })
    })

    it('should dispatch the play action on start', () => {
      cy.wait(5000).then(() => {
        expect(store.getState().timepiece.playtime).to.be.gt(0)
      })
    })
  })
})
