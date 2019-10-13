/* eslint-env mocha */
/* globals cy,expect */
const { onUpdate } = require('../helpers/state')

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
      cy.select('tab-trigger--chapters').should('not.exist')
    })

    it('should render when chapters are available', function () {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>', [this.chapters])
      cy.select('tab-trigger--chapters').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>', [this.chapters]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('chapters')
          done()
        })
      })

      cy.select('tab-trigger--chapters').click()
    })
  })

  describe('files', () => {
    it(`shouldn't render when no files are available`, function () {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>')
      cy.select('tab-trigger--files').should('not.exist')
    })

    it('should render when files are available', function () {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>', [this.audio])
      cy.select('tab-trigger--files').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>', [this.audio]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('files')
          done()
        })
      })

      cy.select('tab-trigger--files').click()
    })
  })

  describe('transcripts', () => {
    it(`shouldn't render when no transcripts are available`, function () {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>')
      cy.select('tab-trigger--transcripts').should('not.exist')
    })

    it('should render when transcripts are available', function () {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>', [this.transcripts])
      cy.select('tab-trigger--transcripts').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>', [this.transcripts]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('transcripts')
          done()
        })
      })

      cy.select('tab-trigger--transcripts').click()
    })
  })

  describe('share', () => {
    it('should render', function () {
      cy.bootstrap('<tab-trigger tab="share">inner</tab-trigger>', [this.reference])
      cy.select('tab-trigger--share').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="share">inner</tab-trigger>', [this.reference]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('share')
          done()
        })
      })

      cy.select('tab-trigger--share').click()
    })
  })

  describe('playlist', () => {
    it(`shouldn't render when no playlist are available`, function () {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>')
      cy.select('tab-trigger--playlist').should('not.exist')
    })

    it('should render when playlist are available', function () {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>', [this.playlist])
      cy.select('tab-trigger--playlist').should('exist')
    })

    it('should emit toggle tab when clicked', function (done) {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>', [this.playlist]).then(app => {
        onUpdate(app, 'PLAYER_TOGGLE_TAB', (_, { payload }) => {
          expect(payload).to.equal('playlist')
          done()
        })
      })

      cy.select('tab-trigger--playlist').click()
    })
  })
})
