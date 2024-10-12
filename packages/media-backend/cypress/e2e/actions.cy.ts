import { audio } from '../../src';
import { onPlay } from '../../src/events';
import {
  actions,
  setPlaytime,
  play,
  pause,
  load,
  mute,
  unmute,
  setVolume,
  setRate
} from '../../src/actions';
import { duration, playing, muted, volume, rate } from '../../src/props';
import { onError } from '../../src/events';

import { audioFixture } from '../support/audio-fixtures';
import { audioLoader } from '../support/audio-loader';
import { MediaElement } from '../../src/types';

describe('actions', () => {
  let audioElement: MediaElement;

  beforeEach(() => {
    audioElement = audio(audioFixture());
    load(audioElement);
    onError(audioElement, console.log);
  });

  afterEach(() => {
    audioElement.remove();
  });

  describe('setPlaytime', () => {
    let playtimeSetter: (input: number) => MediaElement;
    let playAction: () => MediaElement;

    beforeEach(() => {
      playtimeSetter = setPlaytime(audioElement);
      playAction = play(audioElement);
    });

    it('should be a function', () => {
      expect(typeof setPlaytime).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof playtimeSetter).to.equal('function');
    });

    it('should set the playtime', (done) => {
      audioLoader(audioElement, () => {
        expect(playtimeSetter(9).playtime).to.equal(9);
        done();
      });
    });

    it('should prevent playtimes less than 0', (done) => {
      audioLoader(audioElement, () => {
        expect(playtimeSetter(-10).playtime).to.equal(0);
        done();
      });
    });

    it('should prevent playtime larger than duration', (done) => {
      playAction();
      audioLoader(audioElement, () => {
        const dur = duration(audioElement);
        expect(playtimeSetter(dur + 50).playtime).to.equal(dur);
        done();
      });
    });

    it('should use the playtime on play', (done) => {
      audioLoader(
        audioElement,

        () => {
          playtimeSetter(50);
          playAction();
          expect(audioElement.playtime).to.be.at.least(50);
          expect(audioElement.currentTime).to.be.at.least(50);
          done();
        }
      );
    });
  });

  describe('play', () => {
    let playAction: any;
    let playEvent: any;

    beforeEach(() => {
      playAction = play(audioElement);
      playEvent = onPlay(audioElement);
    });

    it('should be a function', () => {
      expect(typeof play).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof playAction).to.equal('function');
    });

    // This test will fail on mobile devices because a direct user interaction is required
    it('should play the audio', (done) => {
      playEvent(
        () => {
          done();
        },
        { once: true }
      );
      playAction();
    });
  });

  describe('pause', () => {
    let pauseAction: any;
    let playAction: any;

    beforeEach(() => {
      pauseAction = pause(audioElement);
      playAction = play(audioElement);
    });

    it('should be a function', () => {
      expect(typeof pause).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof pauseAction).to.equal('function');
    });

    it('should pause the audio', (done) => {
      audioLoader(audioElement, () => {
        playAction();
        setTimeout(() => {
          pauseAction();
          expect(playing(audioElement)).to.equal(false);
          done();
        }, 1000);
      });
    });
  });

  describe('load', () => {
    let loadAction: any;

    beforeEach(() => {
      loadAction = load(audioElement);
    });

    it('should be a function', () => {
      expect(typeof load).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof loadAction).to.equal('function');
    });

    it('should load the audio', (done) => {
      audioElement.addEventListener('canplay', () => done(), { once: true });
      loadAction();
    });
  });

  describe('mute', () => {
    let muteAction: any;

    beforeEach(() => {
      muteAction = mute(audioElement);
    });

    it('should be a function', () => {
      expect(typeof mute).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof muteAction).to.equal('function');
    });

    it('mute the audio', (done) => {
      audioLoader(audioElement, () => {
        expect(muted(audioElement)).to.equal(false);
        muteAction();
        expect(muted(audioElement)).to.equal(true);
        done();
      });
    });
  });

  describe('unmute', () => {
    let muteAction: any;
    let unmuteAction: any;

    beforeEach(() => {
      muteAction = mute(audioElement);
      unmuteAction = unmute(audioElement);
    });

    it('should be a function', () => {
      expect(typeof mute).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof unmuteAction).to.equal('function');
    });

    it('unmute the audio', (done) => {
      audioLoader(audioElement, () => {
        muteAction();
        expect(muted(audioElement)).to.equal(true);
        unmuteAction();
        expect(muted(audioElement)).to.equal(false);
        done();
      });
    });
  });

  // Important: setting volume on mobile is not supported!
  describe('setVolume', () => {
    let setVolumeAction: any;

    beforeEach(() => {
      setVolumeAction = setVolume(audioElement);
      setVolumeAction(1);
    });

    it('should be a function', () => {
      expect(typeof setVolume).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof setVolumeAction).to.equal('function');
    });

    it('sets the audio volume', (done) => {
      audioLoader(audioElement, () => {
        expect(volume(audioElement)).to.equal(1);
        setVolumeAction(0.5);
        expect(volume(audioElement)).to.equal(0.5);
        done();
      });
    });

    it('should prevent volume less than 0', (done) => {
      audioLoader(audioElement, () => {
        expect(volume(audioElement)).to.equal(1);
        setVolumeAction(-1);
        expect(volume(audioElement)).to.equal(0);
        done();
      });
    });

    it('should prevent volume larger than 1', (done) => {
      audioLoader(audioElement, () => {
        expect(volume(audioElement)).to.equal(1);
        setVolumeAction(2);
        expect(volume(audioElement)).to.equal(1);
        done();
      });
    });
  });

  describe('setRate', () => {
    let setRateAction: any;

    beforeEach(() => {
      setRateAction = setRate(audioElement);
    });

    it('should be a function', () => {
      expect(typeof setRate).to.equal('function');
    });

    it('should return a function', () => {
      expect(typeof setRateAction).to.equal('function');
    });

    it('sets the audio rate', (done) => {
      audioLoader(audioElement, () => {
        expect(rate(audioElement)).to.equal(1);
        setRateAction(0.5);
        expect(rate(audioElement)).to.equal(0.5);
        done();
      });
    });

    it('should prevent rate less than 0.5', (done) => {
      audioLoader(audioElement, () => {
        expect(rate(audioElement)).to.equal(1);
        setRateAction(-1);
        expect(rate(audioElement)).to.equal(0.5);
        done();
      });
    });

    it('should prevent rate larger than 4', (done) => {
      audioLoader(audioElement, () => {
        expect(rate(audioElement)).to.equal(1);
        setRateAction(5);
        expect(rate(audioElement)).to.equal(4);
        done();
      });
    });
  });

  describe('actions', () => {
    let audioActions: any;
    let availableActions: any;

    beforeEach(() => {
      audioActions = actions(audioElement);
      availableActions = Object.keys(audioActions);
    });

    it('should be a function', () => {
      expect(typeof actions).to.equal('function');
    });

    it('should return a object with actions', () => {
      expect(availableActions).to.deep.equal([
        'play',
        'pause',
        'load',
        'setPlaytime',
        'mute',
        'unmute',
        'setVolume',
        'setRate'
      ]);
    });

    it('should export an object with functions', () => {
      availableActions.map((action: any) => {
        expect(typeof audioActions[action]).to.equal('function');
      });
    });
  });
});
