/* eslint-env mocha */

const { onUpdate } = require('../helpers/state')

describe('<play-state>', () => {
  beforeEach(cy.setup)

  describe('initialized', () => {
    let assert, dispatch

    beforeEach(function() {
      cy.bootstrap(
        `
        <play-state on="initialized">
          <div style="background: red; width: 50px; height: 50px;" data-test="play-state"></div>
        </play-state>`,
        [this.audio]
      ).then(store => {
        assert = onUpdate(store)
        dispatch = store.dispatch
      })
    })
    it('should render on PLAYER_CONSTRUCTED', () => {
      assert('PLAYER_CONSTRUCTED', () => {
        cy.select('play-state').should('exist')
      })

      dispatch({ type: 'PLAYER_CONSTRUCTED' })
    })

    it('should not render on PLAYER_BACKEND_LOADING_END', () => {
      assert('PLAYER_BACKEND_LOADING_END', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_LOADING_END' })
    })

    it('should not render on PLAYER_BACKEND_PLAYTIME', () => {
      assert('PLAYER_BACKEND_PLAYTIME', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_PLAYTIME' })
    })

    it('should not render on PLAYER_RESTORE', () => {
      assert('PLAYER_RESTORE', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_RESTORE' })
    })

    it('should not render on PLAYER_BACKEND_END', () => {
      assert('PLAYER_BACKEND_END', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_END' })
    })
  })

  describe('active', () => {
    let assert, dispatch

    beforeEach(function() {
      cy.bootstrap(
        `
        <play-state on="active">
          <div style="background: red; width: 50px; height: 50px;" data-test="play-state"></div>
        </play-state>`,
        [this.audio]
      ).then(store => {
        assert = onUpdate(store)
        dispatch = store.dispatch
      })
    })

    it('should not render on PLAYER_CONSTRUCTED', () => {
      assert('PLAYER_CONSTRUCTED', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_CONSTRUCTED' })
    })

    it('should render on PLAYER_BACKEND_LOADING_END', () => {
      assert('PLAYER_BACKEND_LOADING_END', () => {
        cy.select('play-state').should('exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_LOADING_END' })
    })

    it('should render on PLAYER_BACKEND_PLAYTIME', () => {
      assert('PLAYER_BACKEND_PLAYTIME', () => {
        cy.select('play-state').should('exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_PLAYTIME' })
    })

    it('should render on PLAYER_RESTORE', () => {
      assert('PLAYER_RESTORE', () => {
        cy.select('play-state').should('exist')
      })

      dispatch({ type: 'PLAYER_RESTORE' })
    })

    it('should not render on PLAYER_BACKEND_END', () => {
      assert('PLAYER_BACKEND_END', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_END' })
    })
  })

  describe('ended', () => {
    let assert, dispatch

    beforeEach(function() {
      cy.bootstrap(
        `
        <play-state on="ended">
          <div style="background: red; width: 50px; height: 50px;" data-test="play-state"></div>
        </play-state>`,
        [this.audio]
      ).then(store => {
        assert = onUpdate(store)
        dispatch = store.dispatch
      })
    })

    it('should not render on PLAYER_CONSTRUCTED', () => {
      assert('PLAYER_CONSTRUCTED', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_CONSTRUCTED' })
    })

    it('should not render on PLAYER_BACKEND_LOADING_END', () => {
      assert('PLAYER_BACKEND_LOADING_END', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_LOADING_END' })
    })

    it('should not render on PLAYER_BACKEND_PLAYTIME', () => {
      assert('PLAYER_BACKEND_PLAYTIME', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_PLAYTIME' })
    })

    it('should not render on PLAYER_RESTORE', () => {
      assert('PLAYER_RESTORE', () => {
        cy.select('play-state').should('not.exist')
      })

      dispatch({ type: 'PLAYER_RESTORE' })
    })

    it('should not render on PLAYER_BACKEND_END', () => {
      assert('PLAYER_BACKEND_END', () => {
        cy.select('play-state').should('exist')
      })

      dispatch({ type: 'PLAYER_BACKEND_END' })
    })
  })
})
