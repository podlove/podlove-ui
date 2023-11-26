import { setChapter } from '@podlove/player-actions/chapters';
import chapters from '../../fixtures/chapters.json'
import { onUpdate } from '../../helpers/state.js';

describe('<chapter-next>', () => {

  describe('render', () => {
    it('should not render when chapters are not available', () => {
      cy.app('<chapter-next></chapter-next>').then(() => {
        cy.query('chapter-next').should('not.exist')
      })
    })

    it('should render when chapters are available', () => {
      cy.app('<chapter-next></chapter-next>', [chapters]).then(() => {
        cy.query('chapter-next').should('exist')
      })
    })
  })

  describe('logic', () => {
    let assert, store

    beforeEach(() => {
      cy.app('<chapter-next></chapter-next>', [chapters]).then((app) => {
        expect(app.getState().chapters.current.index).to.equal(0)
        cy.query('chapter-next').should('exist')
        assert = onUpdate(app)
        store = app
      })
    })

    it('should jump to the next chapter on click', (done) => {
      assert(setChapter.toString(), (state) => {
        expect(state.chapters.current.index).to.equal(1)
        done()
      })

      cy.query('chapter-next').click()
    })

    it('should be disabled on last chapter', (done) => {
      assert(setChapter.toString(), () => {
        cy.query('chapter-next').should('be.disabled')
        done()
      })

      store.dispatch(setChapter(2));
    })
  })
})
