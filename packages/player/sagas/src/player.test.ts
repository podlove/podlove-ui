import { describe, test, beforeEach, expect, vi } from 'vitest';

import { select, put, takeEvery, fork } from 'redux-saga/effects';
import {
  REQUEST_PLAY,
  REQUEST_PAUSE,
  READY,
  REQUEST_RESTART,
  REQUEST_PLAYTIME,
  SET_RATE,
  SET_VOLUME,
  MUTE,
  UNMUTE,
  REQUEST_LOAD,
  UPDATE_CHAPTER,
  SET_CHAPTER,
  REQUEST_STOP
} from '@podlove/player-actions/types';
import {
  backendPlay,
  backendPause,
  backendEnd,
  backendLoadingStart,
  backendLoadingEnd,
  backendBuffer,
  backendError,
  requestPause
} from '@podlove/player-actions/play';
import {
  backendPlaytime,
  backendDuration,
  backendLiveSync,
  requestPlaytime
} from '@podlove/player-actions/timepiece';
import { errorMissingMedia } from '@podlove/player-actions/error';

import {
  playerSaga,
  initPlayer,
  play,
  pause,
  restart,
  load,
  playtime,
  rate,
  volume,
  muteAudio,
  unmuteAudio,
  onPlay,
  onReady,
  onPause,
  onEnd,
  onPlaytimeUpdate,
  onDurationChange,
  onBufferChange,
  onBuffering,
  onError,
  syncAttributes,
  driver,
  onLiveSyncUpdate,
  onStop
} from './player.js';

vi.mock('@podlove/html5-audio-driver/connect', () => ({
  audio: () => ({
    load: vi.fn(),
    actions: {},
    events: {}
  })
}));

import { audio } from '@podlove/html5-audio-driver/connect';

describe('player', () => {
  describe('playerSaga()', () => {
    let selectMedia, selectPlaytime, selectTitle, selectPoster, connector, factory, gen;

    beforeEach(() => {
      selectMedia = vi.fn();
      selectPlaytime = vi.fn();
      selectTitle = vi.fn();
      selectPoster = vi.fn();
      connector = audio();
      factory = playerSaga({ selectMedia, selectPlaytime, selectTitle, selectPoster });
      gen = factory();
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should register initPlayer on READY', () => {
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(
          takeEvery(READY, initPlayer, { selectMedia, selectTitle, selectPoster, connector })
        )
      );
    });

    test('should register syncAttributes on UPDATE_CHAPTER', () => {
      gen.next();
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(
          takeEvery(UPDATE_CHAPTER, syncAttributes, { connector, selectTitle, selectPoster })
        )
      );
    });

    test('should register syncAttributes on SET_CHAPTER', () => {
      gen.next();
      gen.next();
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(
          takeEvery(SET_CHAPTER, syncAttributes, { connector, selectTitle, selectPoster })
        )
      );
    });

    test('should fork the driver', () => {
      gen.next();
      gen.next();
      gen.next();
      expect(JSON.stringify(gen.next().value)).toEqual(
        JSON.stringify(fork(driver, { selectPlaytime, connector }))
      );
    });

    test('should end the saga', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().done).toBe(true);
    });
  });

  describe('initPlayer()', () => {
    let gen, selectMedia, selectTitle, selectPoster, connector;
    beforeEach(() => {
      selectMedia = vi.fn();
      selectTitle = vi.fn();
      selectPoster = vi.fn();

      connector = {
        load: vi.fn()
      };

      gen = initPlayer({ selectMedia, selectTitle, selectPoster, connector });
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('shoud select mediaFiles', () => {
      expect(gen.next().value).toEqual(select(selectMedia));
    });

    test('should throw if no media files available', () => {
      gen.next();
      expect(gen.next([]).value).toEqual(put(errorMissingMedia()));
    });

    test('should call syncAttributes', () => {
      gen.next();
      expect(gen.next(['foo', 'bar']).value).toEqual(
        fork(syncAttributes, { connector, selectTitle, selectPoster })
      );
    });

    test('should end the saga', () => {
      gen.next();
      gen.next(['foo', 'bar']);
      expect(gen.next().done).toBe(true);
    });
  });

  describe('driver', () => {
    let gen, selectPlaytime, connector;

    beforeEach(() => {
      selectPlaytime = vi.fn();

      connector = {
        mediaElement: {
          setAttribute: vi.fn(),
          removeChild: vi.fn(),
          removeAttribute: vi.fn(),
          appendChild: vi.fn()
        },
        actions: {
          play: vi.fn(),
          pause: vi.fn(),
          load: vi.fn(),
          setPlaytime: vi.fn(),
          mute: vi.fn(),
          unmute: vi.fn(),
          setVolume: vi.fn(),
          setRate: vi.fn()
        },
        events: {
          onLoading: vi.fn(),
          onLoaded: vi.fn(),
          onPause: vi.fn(),
          onBufferChange: vi.fn(),
          onEnd: vi.fn(),
          onPlaytimeUpdate: vi.fn(),
          onVolumeChange: vi.fn(),
          onError: vi.fn(),
          onDurationChange: vi.fn(),
          onLiveSyncUpdate: vi.fn(),
          onRateChange: vi.fn(),
          onPlay: vi.fn(),
          onBuffering: vi.fn(),
          onReady: vi.fn(),
          onFilterUpdate: vi.fn()
        }
      };

      gen = driver({ selectPlaytime, connector });
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    describe('audio actions', () => {
      test('should register play on REQUEST_PLAY', () => {
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(REQUEST_PLAY);
        expect(saga).toEqual(play);
      });

      test('should register pause on REQUEST_PAUSE', () => {
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(REQUEST_PAUSE);
        expect(saga).toEqual(pause);
      });

      test('should register restart on REQUEST_RESTART', () => {
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(REQUEST_RESTART);
        expect(saga).toEqual(restart);
      });

      test('should register load on REQUEST_LOAD', () => {
        gen.next();
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(REQUEST_LOAD);
        expect(saga).toEqual(load);
      });

      test('should register playtime on REQUEST_PLAYTIME', () => {
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(REQUEST_PLAYTIME);
        expect(saga).toEqual(playtime);
      });

      test('should register stop on REQUEST_STOP', () => {
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(REQUEST_STOP);
        expect(saga).toEqual(onStop);
      });

      test('should register rate on SET_RATE', () => {
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(SET_RATE);
        expect(saga).toEqual(rate);
      });

      test('should register rate on SET_VOLUME', () => {
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(SET_VOLUME);
        expect(saga).toEqual(volume);
      });

      test('should register mute on MUTE', () => {
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(MUTE);
        expect(saga).toEqual(muteAudio);
      });

      test('should register unmute on UNMUTE', () => {
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        const [type, saga] = gen.next().value.payload.args;
        expect(type).toEqual(UNMUTE);
        expect(saga).toEqual(unmuteAudio);
      });
    });

    describe('audio events', () => {
      const readyEvent = {
        type: 'READY'
      } as any;

      const playEvent = {
        type: 'PLAY'
      } as any;

      const pauseEvent = {
        type: 'PAUSE'
      } as any;

      const endEvent = {
        type: 'END'
      } as any;

      const playtimeEvent = {
        type: 'PLAYTIME'
      } as any;

      const durationEvent = {
        type: 'DURATION'
      } as any;

      const livesyncEvent = {
        type: 'LIVESYNC'
      } as any;

      const bufferChangeEvent = {
        type: 'BUFFER_CHANGE'
      } as any;

      const bufferingEvent = {
        type: 'BUFFERING'
      } as any;

      const errorEvent = {
        type: 'ERROR'
      } as any;

      beforeEach(() => {
        // Init
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();

        // Events
        gen.next(readyEvent);
        gen.next(playEvent);
        gen.next(pauseEvent);
        gen.next(endEvent);
        gen.next(playtimeEvent);
        gen.next(durationEvent);
        gen.next(livesyncEvent);
        gen.next(bufferingEvent);
        gen.next(bufferChangeEvent);
      });

      test('should create a ready event binding', () => {
        expect(gen.next(errorEvent).value).toEqual(takeEvery(readyEvent, onReady));
      });

      test('should create a play event binding', () => {
        gen.next(errorEvent);
        expect(gen.next().value).toEqual(takeEvery(playEvent, onPlay));
      });

      test('should create a pause event binding', () => {
        gen.next(errorEvent);
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(pauseEvent, onPause));
      });

      test('should create a end event binding', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(endEvent, onEnd));
      });

      test('should create a playtime event binding', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(playtimeEvent, onPlaytimeUpdate));
      });

      test('should create a duration event binding', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(durationEvent, onDurationChange));
      });

      test('should create a livesync event binding', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(livesyncEvent, onLiveSyncUpdate));
      });

      test('should create a bufferChange event binding', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(bufferChangeEvent, onBufferChange));
      });

      test('should create a buffering event binding', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(bufferingEvent, onBuffering));
      });

      test('should create a error event binding', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(takeEvery(errorEvent, onError));
      });

      test('should finish the generator', () => {
        gen.next(errorEvent);
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().done).toBeTruthy();
      });
    });
  });

  describe('play()', () => {
    let gen, actions, selectPlaytime;

    beforeEach(() => {
      actions = {
        setPlaytime: vi.fn(),
        play: vi.fn()
      };
      selectPlaytime = vi.fn();
      gen = play(actions, selectPlaytime);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should select the playtime', () => {
      expect(gen.next().value).toEqual(select(selectPlaytime));
    });

    test('should call media setPlaytime with the selected playtime', () => {
      gen.next();
      gen.next(1337);
      expect(actions.setPlaytime).toHaveBeenCalledWith(1.337);
    });

    test('should call media play', () => {
      gen.next();
      gen.next(1337);
      expect(actions.play).toHaveBeenCalled();
    });

    test('should end the saga', () => {
      gen.next();
      gen.next(1337);
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('pause()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        pause: vi.fn()
      };
      gen = pause(actions);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media pause', () => {
      gen.next();
      expect(actions.pause).toHaveBeenCalled();
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('restart()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        setPlaytime: vi.fn(),
        play: vi.fn()
      };
      gen = restart(actions);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media restart', () => {
      gen.next();
      gen.next();
      expect(actions.setPlaytime).toHaveBeenCalledWith(0);
      expect(actions.play).toHaveBeenCalled();
    });

    test('should end the saga', () => {
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('load()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        load: vi.fn()
      };
      gen = load(actions);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media load', () => {
      gen.next();
      expect(actions.load).toHaveBeenCalled();
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('playtime()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        setPlaytime: vi.fn()
      };
      gen = playtime(actions, { payload: 1337 } as any);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media setPlaytime', () => {
      gen.next();
      expect(actions.setPlaytime).toHaveBeenCalledWith(1.337);
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('rate()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        setRate: vi.fn()
      };
      gen = rate(actions, { payload: 2 } as any);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media setRate', () => {
      gen.next();
      expect(actions.setRate).toHaveBeenCalledWith(2);
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('volume()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        setVolume: vi.fn()
      };
      gen = volume(actions, { payload: 2 } as any);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media volume', () => {
      gen.next();
      expect(actions.setVolume).toHaveBeenCalledWith(2);
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('muteAudio()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        mute: vi.fn()
      };
      gen = muteAudio(actions);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media mute', () => {
      gen.next();
      expect(actions.mute).toHaveBeenCalled();
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('unmuteAudio()', () => {
    let gen, actions;

    beforeEach(() => {
      actions = {
        unmute: vi.fn()
      };
      gen = unmuteAudio(actions);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should call media unmute', () => {
      gen.next();
      expect(actions.unmute).toHaveBeenCalled();
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onReady()', () => {
    let gen;

    beforeEach(() => {
      gen = onReady({ paused: true } as any);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_LOADING_END', () => {
      expect(gen.next().value).toEqual(put(backendLoadingEnd({ paused: true } as any)));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onPlay()', () => {
    let gen;

    beforeEach(() => {
      gen = onPlay();
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_PLAY', () => {
      expect(gen.next().value).toEqual(put(backendPlay()));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onPause()', () => {
    let gen;

    beforeEach(() => {
      gen = onPause();
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_PAUSE', () => {
      expect(gen.next().value).toEqual(put(backendPause()));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onEnd()', () => {
    let gen;

    beforeEach(() => {
      gen = onEnd();
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_END', () => {
      expect(gen.next().value).toEqual(put(backendEnd()));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onPlaytimeUpdate()', () => {
    let gen;

    beforeEach(() => {
      gen = onPlaytimeUpdate(1337);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_PLAYTIME', () => {
      expect(gen.next().value).toEqual(put(backendPlaytime(1337000)));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onDurationChange()', () => {
    let gen;

    beforeEach(() => {
      gen = onDurationChange(1337);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_DURATION', () => {
      expect(gen.next().value).toEqual(put(backendDuration(1337000)));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onLiveSyncUpdate()', () => {
    let gen;

    beforeEach(() => {
      gen = onLiveSyncUpdate(1337);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_LIVESYNC', () => {
      expect(gen.next().value).toEqual(put(backendLiveSync(1337000)));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onBuffering()', () => {
    let gen;

    beforeEach(() => {
      gen = onBuffering();
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_LOADING_START', () => {
      expect(gen.next().value).toEqual(put(backendLoadingStart()));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onBufferChange()', () => {
    let gen;

    beforeEach(() => {
      gen = onBufferChange([
        [0, 10],
        [10, 20]
      ]);
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_BUFFER', () => {
      expect(gen.next().value).toEqual(
        put(
          backendBuffer([
            [0, 10000],
            [10000, 20000]
          ])
        )
      );
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onError()', () => {
    let gen;

    beforeEach(() => {
      gen = onError('MEDIA_ERROR');
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch BACKEND_ERROR', () => {
      expect(gen.next().value).toEqual(put(backendError('MEDIA_ERROR')));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('onStop()', () => {
    let gen;

    beforeEach(() => {
      gen = onStop();
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch REQUEST_PAUSE', () => {
      expect(gen.next().value).toEqual(put(requestPause()));
    });

    test('should dispatch REQUEST_PLAYTIME', () => {
      gen.next();
      expect(gen.next().value).toEqual(put(requestPlaytime(0)));
    });
  });
});
