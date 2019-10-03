/* eslint-env mocha */
/* globals cy,expect */
const { onUpdate } = require('../helpers/state')

// <tab-trigger tab="chapters">
//   <icon type="chapter"></icon>
// </tab-trigger>
// <tab-trigger tab="transcripts">
//   <icon type="transcripts"></icon>
// </tab-trigger>
// <tab-trigger tab="files">
//   <icon type="download"></icon>
// </tab-trigger>
// <tab-trigger tab="playlist">
//   <icon type="playlist"></icon>
// </tab-trigger>
// <tab-trigger tab="share">
//   <icon type="share"></icon>
// </tab-trigger>


describe('<tab-trigger>', () => {
  let assert, dispatch

  beforeEach(cy.setup)
  beforeEach(function () {
    cy.bootstrap('<tab-trigger tab="chapters"><span data-test="inner-slot">Inner</span></tab-trigger>', [this.theme, this.chapters]).then(app => {
      assert = onUpdate(app)
      dispatch = app.dispatch
    })
  })

  describe('chapters', () => {
    it(`shouldn't render when no chapters are available`, function () {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>')
      cy.select('tab-trigger').should('not.exist')
    })

    it('should render when chapters are available', function () {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>', [this.chapters])
      cy.select('tab-trigger').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>', [this.chapters]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('chapters')
          done()
        })
      })

      cy.select('tab-trigger').click()
    })
  })

  describe('files', () => {
    it(`shouldn't render when no files are available`, function () {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>')
      cy.select('tab-trigger').should('not.exist')
    })

    it('should render when files are available', function () {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>', [this.audio])
      cy.select('tab-trigger').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>', [this.audio]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('files')
          done()
        })
      })

      cy.select('tab-trigger').click()
    })
  })

  describe('transcripts', () => {
    it(`shouldn't render when no transcripts are available`, function () {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>')
      cy.select('tab-trigger').should('not.exist')
    })

    it('should render when transcripts are available', function () {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>', [this.transcripts])
      cy.select('tab-trigger').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>', [this.transcripts]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('transcripts')
          done()
        })
      })

      cy.select('tab-trigger').click()
    })
  })

  describe('share', () => {
    it('should render', function () {
      cy.bootstrap('<tab-trigger tab="share">inner</tab-trigger>', [this.reference])
      cy.select('tab-trigger').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="share">inner</tab-trigger>', [this.reference]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('share')
          done()
        })
      })

      cy.select('tab-trigger').click()
    })
  })

  describe('playlist', () => {
    it(`shouldn't render when no playlist are available`, function () {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>')
      cy.select('tab-trigger').should('not.exist')
    })

    it('should render when playlist are available', function () {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>', [this.playlist])
      cy.select('tab-trigger').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>', [this.playlist]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('playlist')
          done()
        })
      })

      cy.select('tab-trigger').click()
    })
  })
})
