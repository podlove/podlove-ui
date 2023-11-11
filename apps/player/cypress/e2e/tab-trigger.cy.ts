import { toggleTab } from '@podlove/player-actions/tabs';
import { onUpdate } from '../helpers/state.js';
import chapters from '../fixtures/chapters.json';
import audio from '../fixtures/audio.json';
import transcripts from '../fixtures/transcripts.json';
import reference from '../fixtures/reference.json';
import playlist from '../fixtures/playlist.json';

describe('<tab-trigger>', () => {
  beforeEach(() => {
    cy.bootstrap(
      '<tab-trigger tab="chapters"><span data-test="inner-slot">Inner</span></tab-trigger>',
      [chapters]
    );
  });

  describe('chapters', () => {
    it(`shouldn't render when no chapters are available`, () => {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>');
      cy.query('tab-trigger--chapters').should('not.exist');
    });

    it('should render when chapters are available', () => {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>', [chapters]);
      cy.query('tab-trigger--chapters').should('exist');
    });

    it('should emit toggle tab when clicked', (done) => {
      cy.bootstrap('<tab-trigger tab="chapters">inner</tab-trigger>', [chapters]).then((app) => {
        onUpdate(app, toggleTab.toString(), (_, { payload }) => {
          expect(payload).to.equal('chapters');
          done();
        });
      });

      cy.query('tab-trigger--chapters').click();
    });
  });

  describe('files', () => {
    it(`shouldn't render when no files are available`, () => {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>');
      cy.query('tab-trigger--files').should('not.exist');
    });

    it('should render when files are available', () => {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>', [audio]);
      cy.query('tab-trigger--files').should('exist');
    });

    it('should emit toggle tab when clicked', (done) => {
      cy.bootstrap('<tab-trigger tab="files">inner</tab-trigger>', [audio]).then((app) => {
        onUpdate(app, toggleTab.toString(), (_, { payload }) => {
          expect(payload).to.equal('files');
          done();
        });
      });

      cy.query('tab-trigger--files').click();
    });
  });

  describe('transcripts', () => {
    it(`shouldn't render when no transcripts are available`, () => {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>');
      cy.query('tab-trigger--transcripts').should('not.exist');
    });

    it('should render when transcripts are available', () => {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>', [transcripts]);
      cy.query('tab-trigger--transcripts').should('exist');
    });

    it('should emit toggle tab when clicked', (done) => {
      cy.bootstrap('<tab-trigger tab="transcripts">inner</tab-trigger>', [transcripts]).then(
        (app) => {
          onUpdate(app, toggleTab.toString(), (_, { payload }) => {
            expect(payload).to.equal('transcripts');
            done();
          });
        }
      );

      cy.query('tab-trigger--transcripts').click();
    });
  });

  describe('share', () => {
    it('should render',  () => {
      cy.bootstrap('<tab-trigger tab="share">inner</tab-trigger>', [reference]);
      cy.query('tab-trigger--share').should('exist');
    });

    it('should emit toggle tab when clicked', (done) => {
      cy.bootstrap('<tab-trigger tab="share">inner</tab-trigger>', [reference]).then((app) => {
        onUpdate(app, toggleTab.toString(), (_, { payload }) => {
          expect(payload).to.equal('share');
          done();
        });
      });

      cy.query('tab-trigger--share').click();
    });
  });

  describe('playlist', () => {
    it(`shouldn't render when no playlist are available`, () => {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>');
      cy.query('tab-trigger--playlist').should('not.exist');
    });

    it('should render when playlist are available', () => {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>', [playlist]);
      cy.query('tab-trigger--playlist').should('exist');
    });

    it('should emit toggle tab when clicked', (done) => {
      cy.bootstrap('<tab-trigger tab="playlist">inner</tab-trigger>', [playlist]).then(
        (app) => {
          onUpdate(app, toggleTab.toString(), (_, { payload }) => {
            expect(payload).to.equal('playlist');
            done();
          });
        }
      );

      cy.query('tab-trigger--playlist').click();
    });
  });
});
