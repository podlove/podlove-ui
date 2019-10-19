/* eslint-env mocha */
/* globals cy, expect */
const { onUpdate } = require('../helpers/state')

describe('<tab-files>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    describe('title', () => {
      it('should render the tab title', () => {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [this.theme, this.audio])
        cy.select('tab-title').should('exist')
        cy.select('tab-title').should('contain', 'Files')
      })
    })

    describe('list', () => {
      it(`shouldn't render entries if no files are available`, function() {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [this.theme])
        cy.select('tab-files--download').should('have.length', 0)
      })

      it(`should render entries if files are available`, function() {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [this.theme, this.audio])
        cy.select('tab-files--download').should('have.length', this.audio.audio.length)
      })

      it(`should render the entries in the right order`, function() {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [this.theme, this.audio])
        cy.select('tab-files--download').then(nodes => {
          this.audio.audio.forEach((audio, index) => {
            expect(nodes.get(index).textContent).to.contain(audio.title)
            expect(nodes.get(index).getAttribute('href')).to.equal(audio.url)
          })
        })
      })
    })
  })

  describe('logic', () => {
    let assert

    beforeEach(function() {
      cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [this.theme, this.audio]).then(
        app => {
          assert = onUpdate(app)
        }
      )
    })

    describe('title', () => {
      it('should trigger the toggle tab action on close', done => {
        assert('PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('files')
          done()
        })

        cy.select('tab-title--close').click()
      })
    })
  })
})
