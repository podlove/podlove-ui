/* eslint-env mocha */
/* globals cy */
const { onUpdate } = require('../helpers/state')


describe('<play-button>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render', function () {
      cy.bootstrap('<play-button></play-button>').then(() => {
        cy.select('play-button').should('be.visible')
      })
    })

    it('should render the duration', function () {
      cy.bootstrap('<play-button></play-button>', [{ duration: '1:11:11' }]).then(() => {
        cy.select('play-button').should('contain', '1:11:11')
      })
    })

    it('should set the background color', function () {
      cy.bootstrap('<play-button></play-button>', [this.theme]).then(() => {
        cy.select('play-button').find('.wrapper').should('have.css', 'background').and('be', 'rgb(35, 89, 115)')
      })
    })
  })

  describe('interface', () => {
    it('should set the label', () => {
      cy.bootstrap('<play-button label="Custom Label"></play-button>').then(() => {
        cy.select('play-button').find('.label').should('contain', 'Custom Label')
      })
    })
  })

  describe('logic', () => {
    let dispatch, assert

    beforeEach(function () {
      cy.bootstrap('<play-button></play-button>', [this.episode, this.audio]).then((app) => {
        assert = onUpdate(app)
        dispatch = app.dispatch
      })
    })

    it('should show the loading indicator on play', () => {
      assert('PLAYER_REQUEST_PLAY', () => {
        cy.get('#play-button--loading').should('be.visible')
      })
      dispatch({ type: 'PLAYER_REQUEST_PLAY' })
    })

    it('should show the pause button on play', () => {
      assert('PLAYER_REQUEST_PLAY', () => {
        cy.get('#play-button--pause').should('be.visible')
      })
      dispatch({ type: 'PLAYER_REQUEST_PLAY' })
    })

    it('should show the play button on pause', () => {
      assert('REQUEST_PAUSE', () => {
        cy.get('#play-button--play').should('be.visible')
      })
      dispatch({ type: 'REQUEST_PAUSE' })
    })

    it('should show the replay button on end', () => {
      assert('PLAYER_REQUEST_PLAY', () => {
        cy.get('#play-button--restart').should('be.visible')
      })
      dispatch({ type: 'PLAYER_REQUEST_PLAYTIME', payload: 12000 })
      dispatch({ type: 'PLAYER_REQUEST_PLAY', payload: 12000 })
    })
  })
})
