import { createSelector } from 'reselect';
import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time';
import { currentChapterByPlaytime } from '@podlove/utils/chapters';
import type { PodloveWebPlayerChapter } from '@podlove/types';

import type State from './state.js';

import { selectors as runtime } from './stores/runtime.store';
import { selectors as podcast } from './stores/podcast.store';
import { selectors as episodes } from './stores/episodes.store';
import { selectors as player } from './stores/player.store';
import { selectors as playbar } from './stores/playbar.store';
import { selectors as subscribeButton } from './stores/subscribe-button.store';
import { selectors as search } from './stores/search.store';
import { selectors as router } from './stores/router.store';
import { selectors as contributors } from './stores/contributors.store';
import { selectors as view } from './stores/view.store';
import { selectors as colors } from './stores/colors.store';

const slices = {
  runtime: (state: State) => state.runtime,
  podcast: (state: State) => state.podcast,
  player: (state: State) => state.player,
  playbar: (state: State) => state.playbar,
  search: (state: State) => state.search,
  episodes: (state: State) => state.episodes,
  subscribeButton: (state: State) => state.subscribeButton,
  router: (state: State) => state.router,
  contributors: (state: State) => state.contributors,
  view: (state: State) => state.view,
  colors: (state: State) => state.colors
};

// runtime
const cacheKey = createSelector(slices.runtime, runtime.cacheKey);

// podcast
const feed = createSelector(slices.podcast, podcast.feed);

const playtime = createSelector(slices.player, player.playtime);

const duration = createSelector(slices.player, player.duration);

const showTitle = createSelector(slices.player, player.showTitle);
const showPoster = createSelector(slices.player, player.showPoster);

const episodeTitle = createSelector(slices.player, player.episodeTitle);
const episodePoster = createSelector(slices.player, player.episodePoster);

const playing = createSelector(slices.player, player.playing);
const currentEpisode = createSelector(slices.player, player.currentEpisode);

const volume = createSelector(slices.player, player.volume);
const muted = createSelector(slices.player, player.muted);
const rate = createSelector(slices.player, player.rate);

const playerGhostTime = createSelector(slices.player, player.ghostTime);

// chapters
const chaptersList = createSelector(slices.player, player.chaptersList);
const chaptersNext = createSelector(slices.player, player.chaptersNext);
const chaptersPrevious = createSelector(slices.player, player.chaptersPrevious);
const chaptersCurrent = createSelector(slices.player, player.chaptersCurrent);
const chaptersTitle = createSelector(slices.player, player.chaptersTitle);
const chaptersImage = createSelector(slices.player, player.chaptersImage);

// router
const base = createSelector(slices.router, router.base);

const translation = (key: string, attr = {}) => ({ key, attr });

export default {
  runtime: {
    initialized: createSelector(slices.runtime, runtime.initialized),
    locale: createSelector(slices.runtime, runtime.locale),
    cacheKey,
    buildDate: createSelector(slices.runtime, runtime.buildDate)
  },
  podcast: {
    show: createSelector(slices.podcast, podcast.show),
    feed,
    title: createSelector(slices.podcast, podcast.title),
    poster: createSelector(slices.podcast, podcast.poster),
    description: createSelector(slices.podcast, podcast.description),
    summary: createSelector(slices.podcast, podcast.summary),
    copyright: createSelector(slices.podcast, podcast.copyright),
    mail: createSelector(slices.podcast, podcast.mail),
    owner: createSelector(slices.podcast, podcast.owner)
  },
  current: {
    episode: currentEpisode
  },
  episode: {
    data: (id: number | string) => createSelector(slices.episodes, episodes.item(id)),
    title: episodeTitle,
    poster: episodePoster,
    loaded: (id: string) =>
      createSelector(currentEpisode, (episodeId: string | null) => episodeId === id),
    playing: (id: string) =>
      createSelector(
        [currentEpisode, playing],
        (episodeId: string | null, isPlaying: boolean) => episodeId === id && isPlaying
      )
  },
  episodes: {
    list: createSelector(slices.episodes, episodes.list)
  },
  view: {
    archive: {
      episodes: createSelector(slices.view, view.archiveEpisodes),
      page: createSelector(slices.view, view.archiveEpisodesPage)
    },
    loading: createSelector(slices.view, view.loading)
  },
  colors: {
    values: createSelector(slices.colors, colors.colors),
    initialized: createSelector(slices.colors, colors.initialized),
  },
  show: {
    poster: showPoster,
    title: showTitle
  },
  player: {
    playtime,
    duration,
    playing,
    livesync: createSelector(slices.player, player.livesync),
    title: createSelector(
      [episodeTitle, showTitle],
      (episode: string | null, show: string | null) => episode || show || ''
    ),
    image: createSelector(
      [episodePoster, showPoster],
      (episode: string | null, show: string | null) => episode || show || ''
    ),
    quantiles: createSelector(slices.player, player.quantiles),
    buffer: createSelector(slices.player, player.buffer),
    ghost: {
      time: playerGhostTime,
      active: createSelector(slices.player, player.ghostActive),
      chapter: createSelector(
        [chaptersList, playerGhostTime],
        (chapters: PodloveWebPlayerChapter[], ghostPlaytime: number | null) =>
          currentChapterByPlaytime(chapters || [], ghostPlaytime || 0)
      )
    },
    media: createSelector(slices.player, player.media),
    audio: {
      muted,
      volume,
      rate
    },
    chapters: {
      list: chaptersList,
      next: chaptersNext,
      previous: chaptersPrevious,
      current: chaptersCurrent,
      title: chaptersTitle,
      image: chaptersImage
    }
  },
  playbar: {
    active: createSelector(slices.playbar, playbar.active),
    button: createSelector(slices.playbar, playbar.button),
    followContent: createSelector(slices.playbar, playbar.followContent),
    volume: (state: State) => {
      if (muted(state)) {
        return 'speaker-0';
      }

      if (volume(state) >= 0.75) {
        return 'speaker-75';
      }

      if (volume(state) >= 0.5) {
        return 'speaker-50';
      }

      if (volume(state) > 0) {
        return 'speaker-25';
      }

      return 'speaker-0';
    },
    rate: (state: State) => {
      if (rate(state) <= 0.5) {
        return 'speed-050';
      }

      if (rate(state) <= 0.75) {
        return 'speed-075';
      }

      if (rate(state) <= 1) {
        return 'speed-100';
      }

      if (rate(state) <= 1.25) {
        return 'speed-125';
      }

      if (rate(state) <= 1.5) {
        return 'speed-150';
      }

      if (rate(state) <= 1.75) {
        return 'speed-175';
      }

      return 'speed-200';
    },
    chapters: createSelector(slices.playbar, playbar.chapters)
  },
  subscribeButton: {
    visible: createSelector(slices.subscribeButton, subscribeButton.visible)
  },
  search: {
    query: createSelector(slices.search, search.query),
    visible: createSelector(slices.search, search.visible),
    initialized: createSelector(slices.search, search.initialized),
    contributors: createSelector(slices.search, search.contributors),
    episodes: createSelector(slices.search, search.episodes),
    transcripts: createSelector(slices.search, search.transcripts),
    results: createSelector(slices.search, search.results),
    hasResults: createSelector(slices.search, search.hasResults),
    selectedResult: createSelector(slices.search, search.selectedResult),
    episodesInitialized: createSelector(slices.search, search.episodesInitialized),
    transcriptsInitialized: createSelector(slices.search, search.transcriptsInitialized)
  },
  contributors: {
    item: (id: string) => createSelector(slices.contributors, contributors.item(id)),
    list: createSelector(slices.contributors, contributors.list)
  },
  router: {
    base,
    episodeId: createSelector(slices.router, router.episodeId),
    index: createSelector([base, feed], (...args) => args.filter(Boolean).join('/')),
    episode: (episodeId: string) =>
      createSelector([base, feed], (...args) =>
        [...args, 'episode', episodeId].filter(Boolean).join('/')
      )
  },
  a11y: {
    chapterNext: (state: State) => {
      const next = chaptersNext(state);

      if (!next) {
        return translation('A11Y.PLAYER_CHAPTER_END');
      }

      return translation('A11Y.PLAYER_CHAPTER_NEXT', next);
    },
    chapterPrevious: (state: State) => {
      const previous = chaptersPrevious(state);
      const current = chaptersCurrent(state);

      if (!previous) {
        return translation('A11Y.PLAYER_CHAPTER_START');
      }

      if (Number(current?.start) + 2000 > playtime(state)) {
        return translation('A11Y.PLAYER_CHAPTER_CURRENT', current || {});
      }

      return translation('A11Y.PLAYER_CHAPTER_PREVIOUS', previous);
    },
    progressBar: () => {
      return translation('A11Y.PROGRESSBAR_INPUT');
    },
    stepperBackwards: () => {
      return translation('A11Y.PLAYER_STEPPER_BACK', { seconds: 15 });
    },
    stepperForward: () => {
      return translation('A11Y.PLAYER_STEPPER_FORWARD', { seconds: 30 });
    },
    playButtonPause: (state: State) => {
      return translation('A11Y.PLAYER_PAUSE', chaptersCurrent(state) || {});
    },
    playButtonDuration: (state: State) => {
      const time = {
        duration: duration(state),
        playtime: playtime(state)
      };

      return translation('A11Y.PLAYER_START', {
        hours: calcHours(time.playtime > 0 ? time.playtime : time.duration),
        minutes: calcMinutes(time.playtime > 0 ? time.playtime : time.duration),
        seconds: calcSeconds(time.playtime > 0 ? time.playtime : time.duration)
      });
    },
    playButtonReplay: () => {
      return translation('A11Y.PLAYER_LOADING');
    },
    playButtonPlay: () => {
      return translation('A11Y.PLAYER_PLAY');
    },
    playButtonError: () => {
      return translation('A11Y.PLAYER_ERROR');
    }
  }
};
