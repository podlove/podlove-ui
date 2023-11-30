import { audio } from "../../src";
import { collectProperties, getNodeFromEvent } from "../../src/utils";
import { audioFixture } from "../support/audio-fixtures";
import { audioLoader } from "../support/audio-loader";

describe("utils", () => {
  describe("collectProperties", () => {
    it("should be a function", () => {
      expect(typeof collectProperties).to.equal("function");
    });

    it("should return a function", () => {
      expect(typeof collectProperties({ foo: "bar" })).to.equal("function");
    });

    it("should call a list of function with a given value", () => {
      const propertySpyA = cy.spy();
      const propertySpyB = cy.spy();

      collectProperties({ propertySpyA, propertySpyB })("foo");
      expect(propertySpyA).to.have.been.calledWith("foo");
      expect(propertySpyB).to.have.been.calledWith("foo");
    });
  });

  describe("getNodeFromEvent", () => {
    let audioElement: HTMLAudioElement;

    beforeEach(() => {
      audioElement = audio(audioFixture());
    });

    afterEach(() => {
      audioElement.remove();
    });

    it("should be a function", () => {
      expect(typeof getNodeFromEvent).to.equal("function");
    });

    it("should extract the audio element from event", (done) => {
      audioLoader(audioElement, (target, event) => {
        expect(getNodeFromEvent(event)).to.equal(audioElement);
        done();
      });
    });
  });
});
