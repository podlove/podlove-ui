import { onUpdate } from '../helpers/state.js';
import { toggleTab } from '@podlove/player-actions/tabs';
import audio from '../fixtures/audio.json';

describe('<tab-files>', () => {
  describe('render', () => {
    describe('title', () => {
      it('should render the tab title', () => {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [audio]);
        cy.query('tab-title').should('exist');
        cy.query('tab-title').should('contain', 'Files');
      });
    });

    describe('list', () => {
      it(`shouldn't render entries if no files are available`, () => {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', []);
        cy.query('tab-files--download').should('have.length', 0);
      });

      it(`should render entries if files are available`, () => {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [audio]);
        cy.query('tab-files--download').should('have.length', audio.audio.length);
      });

      it(`should render the entries in the right order`, () => {
        cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [audio]);
        cy.query('tab-files--download').then((nodes) => {
          audio.audio.forEach((audio, index) => {
            expect(nodes.get(index).textContent).to.contain(audio.title);
            expect(nodes.get(index).getAttribute('href')).to.equal(audio.url);
          });
        });
      });
    });
  });

  describe('logic', () => {
    let assert;

    beforeEach(() => {
      cy.bootstrap('<tab-files style="width: 400px;"></tab-files>', [audio]).then(
        (app) => {
          assert = onUpdate(app);
        }
      );
    });

    describe('title', () => {
      it('should trigger the toggle tab action on close', (done) => {
        assert(toggleTab.toString(), (_, { payload }) => {
          expect(payload).to.equal('files');
          done();
        });

        cy.query('tab-title--close').click();
      });
    });
  });
});
