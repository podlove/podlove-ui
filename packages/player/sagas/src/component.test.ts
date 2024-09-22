import { describe, test, beforeEach, vi, expect } from 'vitest';
import {
  init,
  componentsSaga,
  play,
  pause,
  loading,
  loaded,
  transcripts,
  replay,
  chapters
} from './components.js';
import { put, takeEvery, select } from 'redux-saga/effects';
import {
  READY,
  BACKEND_PLAY,
  BACKEND_PAUSE,
  BACKEND_LOADING_START,
  BACKEND_LOADING_END,
  SET_TRANSCRIPTS_TIMELINE,
  BACKEND_END,
  SET_CHAPTERS_LIST,
  SELECT_PLAYLIST_ENTRY
} from '@podlove/player-actions/types';
import {
  showPlayingButton,
  showLoadingButton,
  showPauseButton,
  showChapterControls,
  showReplayButton,
  hideComponentTab,
  showComponentTab,
  hideChapterControls,
  showInfoPoster,
  hideInfoPoster,
  hideEpisodeTitle,
  showSubtitle,
  showEpisodeTitle,
  hideSubtitle,
  showShowTitle,
  hideShowTitle,
  showVolumeSlider,
  hideVolumeSlider,
  showRateSlider
} from '@podlove/player-actions/components';

describe('components', () => {
  let selectors;

  beforeEach(() => {
    selectors = {
      selectTranscripts: vi.fn(),
      selectChapters: vi.fn(),
      selectFiles: vi.fn(),
      selectEpisodeCover: vi.fn(),
      selectEpisodeTitle: vi.fn(),
      selectEpisodeSubtitle: vi.fn(),
      selectShowTitle: vi.fn(),
      selectShowCover: vi.fn(),
      selectRuntimeMode: vi.fn(),
      selectRuntimePlatform: vi.fn(),
      selectPlaylist: vi.fn(),
      selectChannels: vi.fn(),
      selectHasEmbedLink: vi.fn()
    };
  });

  describe('componentsSaga()', () => {
    let factory, gen;

    beforeEach(() => {
      factory = componentsSaga(selectors);
      gen = factory();
    });

    test('shoud export a factory', () => {
      expect(typeof factory).toBe('function');
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should register init on READY', () => {
      expect(gen.next().value).toEqual(
        takeEvery(READY, init, {
          selectFiles: selectors.selectFiles,
          selectPlaylist: selectors.selectPlaylist,
          selectEpisodeCover: selectors.selectEpisodeCover,
          selectEpisodeTitle: selectors.selectEpisodeTitle,
          selectEpisodeSubtitle: selectors.selectEpisodeSubtitle,
          selectShowTitle: selectors.selectShowTitle,
          selectShowCover: selectors.selectShowCover,
          selectRuntimeMode: selectors.selectRuntimeMode,
          selectRuntimePlatform: selectors.selectRuntimePlatform,
          selectChannels: selectors.selectChannels,
          selectHasEmbedLink: selectors.selectHasEmbedLink
        })
      );
    });

    test('should register transcripts on SET_TRANSCRIPTS_TIMELINE', () => {
      gen.next();
      expect(gen.next().value).toEqual(
        takeEvery(SET_TRANSCRIPTS_TIMELINE, transcripts, {
          selectTranscripts: selectors.selectTranscripts
        })
      );
    });

    test('should register chapters on SET_CHAPTERS_LIST', () => {
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(
        takeEvery(SET_CHAPTERS_LIST, chapters, { selectChapters: selectors.selectChapters })
      );
    });

    test('should register play on BACKEND_PLAY', () => {
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(BACKEND_PLAY, play));
    });

    test('should register pause on SELECT_PLAYLIST_ENTRY', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(SELECT_PLAYLIST_ENTRY, pause));
    });

    test('should register pause on BACKEND_PAUSE', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(BACKEND_PAUSE, pause));
    });

    test('should register loading on BACKEND_LOADING_START', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(BACKEND_LOADING_START, loading));
    });

    test('should register loaded on BACKEND_LOADING_END', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(BACKEND_LOADING_END, loaded));
    });

    test('should register replay on BACKEND_END', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(BACKEND_END, replay));
    });

    test('should end the saga', () => {
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

  describe('init()', () => {
    let gen;

    beforeEach(() => {
      gen = init({
        selectFiles: selectors.selectFiles,
        selectPlaylist: selectors.selectPlaylist,
        selectEpisodeCover: selectors.selectEpisodeCover,
        selectEpisodeTitle: selectors.selectEpisodeTitle,
        selectEpisodeSubtitle: selectors.selectEpisodeSubtitle,
        selectShowTitle: selectors.selectShowTitle,
        selectShowCover: selectors.selectShowCover,
        selectRuntimeMode: selectors.selectRuntimeMode,
        selectRuntimePlatform: selectors.selectRuntimePlatform,
        selectChannels: selectors.selectChannels,
        selectHasEmbedLink: selectors.selectHasEmbedLink
      });
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should select the files', () => {
      expect(gen.next().value).toEqual(select(selectors.selectFiles));
    });

    test('should select the playlist', () => {
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectPlaylist));
    });

    test('should select the showCover', () => {
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectShowCover));
    });

    test('should select the episodeCover', () => {
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectEpisodeCover));
    });

    test('should select the episodeTitle', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectEpisodeTitle));
    });

    test('should select the episodeSubtitle', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectEpisodeSubtitle));
    });

    test('should select the selectShowTitle', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectShowTitle));
    });

    test('should select the runtimeMode', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectRuntimeMode));
    });

    test('should select the channels', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(select(selectors.selectChannels));
    });

    test('should select embed link available', () => {
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
      expect(gen.next().value).toEqual(select(selectors.selectHasEmbedLink));
    });

    test('should dispatch SHOW_COMPONENT_INFO_POSTER if showCover is available', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next('/some/show-image');
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showInfoPoster()));
    });

    test('should dispatch SHOW_COMPONENT_INFO_POSTER if episodeCover is available', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next('/some/episode-image');
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showInfoPoster()));
    });

    test('should dispatch HIDE_COMPONENT_INFO_POSTER if neither episodeCover nor showCover is available', () => {
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
      expect(gen.next().value).toEqual(put(hideInfoPoster()));
    });

    test('should dispatch SHOW_COMPONENT_EPISODE_TITLE if episodeTitle is available', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next('episode title');
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showEpisodeTitle()));
    });

    test('should dispatch HIDE_COMPONENT_EPISODE_TITLE if episodeTitle is not available', () => {
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
      gen.next();
      expect(gen.next().value).toEqual(put(hideEpisodeTitle()));
    });

    test('should dispatch SHOW_COMPONENT_SUBTITLE if subtitle is available', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next('subtitle');
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showSubtitle()));
    });

    test('should dispatch HIDE_COMPONENT_SUBTITLE if subtitle is not available', () => {
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
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(hideSubtitle()));
    });

    test('should dispatch SHOW_COMPONENT_SHOW_TITLE if showTitle is available', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next('show title');
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showShowTitle()));
    });

    test('should dispatch HIDE_COMPONENT_SHOW_TITLE if showTitle is not available', () => {
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
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(hideShowTitle()));
    });

    test('should dispatch SHOW_COMPONENT_TAB with files if files are available', () => {
      gen.next();
      gen.next(['some files']);
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
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showComponentTab('files')));
    });

    test('should dispatch HIDE_COMPONENT_TAB with files if files are not available', () => {
      gen.next();
      gen.next([]);
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
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(hideComponentTab('files')));
    });

    test('should dispatch SHOW_COMPONENT_TAB with playlist if entries are available', () => {
      gen.next();
      gen.next();
      gen.next(['some playlist']);
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
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showComponentTab('playlist')));
    });

    test('should dispatch HIDE_COMPONENT_TAB with playlist if entries are not available', () => {
      gen.next();
      gen.next();
      gen.next([]);
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
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(hideComponentTab('playlist')));
    });

    test('should dispatch SHOW_COMPONENT_TAB with shownotes', () => {
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
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showComponentTab('shownotes')));
    });

    test('should dispatch SHOW_COMPONENT_TAB with share when channels are avaialble', () => {
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
      gen.next([1, 2, 3]);
      gen.next(false);
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showComponentTab('share')));
    });

    test('should dispatch SHOW_COMPONENT_TAB with share when episode link is avaialble', () => {
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
      gen.next(true);
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showComponentTab('share')));
    });

    test('should dispatch HIDE_COMPONENT_TAB with share when neither channels nor episode link is available', () => {
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
      gen.next([]);
      gen.next(false);
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(hideComponentTab('share')));
    });

    test('should dispatch SHOW_COMPONENT_VOLUME_SLIDER when mode is "native" and runtime is "desktop"', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next('native');
      gen.next('desktop');
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showVolumeSlider()));
    });

    test('should dispatch HIDE_COMPONENT_VOLUME_SLIDER when mode is not native', () => {
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
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(hideVolumeSlider()));
    });

    test('should dispatch SHOW_COMPONENT_RATE_SLIDER', () => {
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
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(showRateSlider()));
    });

    test('should end the saga', () => {
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
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('transcripts()', () => {
    let gen;

    beforeEach(() => {
      gen = transcripts({ selectTranscripts: selectors.selectTranscripts });
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('shoud select transcripts', () => {
      expect(gen.next().value).toEqual(select(selectors.selectTranscripts));
    });

    test('shoud dispatch SHOW_COMPONENT_TAB with transcripts if transcripts are available', () => {
      gen.next();
      expect(gen.next(['foo', 'bar']).value).toEqual(put(showComponentTab('transcripts')));
    });

    test('shoud dispatch HIDE_COMPONENT_TAB with transcripts if transcripts are available', () => {
      gen.next();
      expect(gen.next(false).value).toEqual(put(hideComponentTab('transcripts')));
    });
  });

  describe('chapters()', () => {
    let gen;

    beforeEach(() => {
      gen = chapters({ selectChapters: selectors.selectChapters });
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('shoud dispatch SHOW_COMPONENT_CONTROLS_CHAPTERS if chapters are available', () => {
      gen.next();
      expect(gen.next(['foo', 'bar']).value).toEqual(put(showChapterControls()));
    });

    test("shoud dispatch HIDE_COMPONENT_CONTROLS_CHAPTERS if chapters aren't available", () => {
      gen.next();
      expect(gen.next([]).value).toEqual(put(hideChapterControls()));
    });

    test('shoud dispatch SHOW_COMPONENT_TAB if chapters are available', () => {
      gen.next();
      gen.next(['foo', 'bar']);
      expect(gen.next().value).toEqual(put(showComponentTab('chapters')));
    });

    test("shoud dispatch HIDE_COMPONENT_TAB if chapters aren't available", () => {
      gen.next();
      gen.next([]);
      expect(gen.next().value).toEqual(put(hideComponentTab('chapters')));
    });
  });

  describe('play()', () => {
    let gen;

    beforeEach(() => {
      gen = play();
    });

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING', () => {
      expect(gen.next().value).toEqual(put(showPlayingButton()));
    });

    test('should end the saga', () => {
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('pause()', () => {
    test('shoud export a generator', () => {
      const gen = pause();
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE', () => {
      const gen = pause();
      expect(gen.next().value).toEqual(put(showPauseButton()));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('loading()', () => {
    test('shoud export a generator', () => {
      const gen = loading();
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_LOADING', () => {
      const gen = loading();
      expect(gen.next().value).toEqual(put(showLoadingButton()));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('loaded()', () => {
    test('shoud export a generator', () => {
      const gen = loaded({ payload: null } as any);
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE on paused', () => {
      const gen = loaded({ payload: { paused: true } } as any);
      expect(gen.next().value).toEqual(put(showPauseButton()));
      expect(gen.next().done).toBeTruthy();
    });

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING on paused', () => {
      const gen = loaded({ payload: { paused: false } } as any);
      expect(gen.next().value).toEqual(put(showPlayingButton()));
      expect(gen.next().done).toBeTruthy();
    });
  });
});

describe('replay()', () => {
  let gen;

  beforeEach(() => {
    gen = replay();
  });

  test('shoud export a generator', () => {
    expect(typeof gen.next).toBe('function');
  });

  test('shoud dispatch SHOW_COMPONENT_REPLAY_BUTTON transcripts', () => {
    expect(gen.next().value).toEqual(put(showReplayButton()));
  });
});
