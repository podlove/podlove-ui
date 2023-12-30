import { createSelector } from 'reselect';
import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time';
import { selectors as driver } from '@podlove/player-state/driver';
import { selectors as show } from '@podlove/player-state/show';
import { selectors as media } from '@podlove/player-state/media';
import { selectors as timepiece } from '@podlove/player-state/timepiece';
import { selectors as episode } from '@podlove/player-state/episode';
import { selectors as audio } from '@podlove/player-state/audio';
import { selectors as network } from '@podlove/player-state/network';
import { selectors as ghost } from '@podlove/player-state/ghost';
import { selectors as chapters } from '@podlove/player-state/chapters';
import { selectors as quantiles } from '@podlove/player-state/quantiles';

import { currentChapterByPlaytime } from '@podlove/utils/chapters';

import type State from './state';

import { selectors as runtime } from './stores/runtime.store';
import { selectors as theme } from './stores/theme.store';
import { selectors as podcast } from './stores/podcast.store';
import { selectors as episodes } from './stores/episodes.store';
import { selectors as player } from './stores/player.store';
import { selectors as playbar } from './stores/playbar.store';
import { selectors as subscribeButton } from './stores/subscribe-button.store';
import { selectors as router } from './stores/router.store';
import { selectors as search } from './stores/search.store';
import { select } from './helper';
import type { PodloveWebPlayerChapter } from '@podlove/types';

const slices = {
  runtime: select('runtime'),
  theme: select('theme'),
  podcast: select('podcast'),
  player: select('player'),
  playbar: select('playbar'),
  router: select('router'),
  search: select('search'),
  episodes: select('episodes'),
  subscribeButton: select('subscribeButton')
};

const playtime = createSelector(slices.player, select('timepiece'), timepiece.playtime);
const duration = createSelector(slices.player, select('timepiece'), timepiece.duration);

const showTitle = createSelector(slices.player, select('show'), show.title);
const showPoster = createSelector(slices.player, select('show'), show.poster);

const episodeTitle = createSelector(slices.player, select('episode'), episode.title);
const episodePoster = createSelector(slices.player, select('episode'), episode.poster);

const playing = createSelector(slices.player, select('driver'), driver.playing);
const currentEpisode = createSelector(slices.player, select('current'), player.episode);

const volume = createSelector(slices.player, select('audio'), audio.volume);
const muted = createSelector(slices.player, select('audio'), audio.muted);
const rate = createSelector(slices.player, select('audio'), audio.rate);

const playerGhostTime = createSelector(slices.player, select('ghost'), ghost.time);

// chapters
const chaptersList = createSelector(slices.player, select('chapters'), chapters.list);
const chaptersNext = createSelector(slices.player, select('chapters'), chapters.next);
const chaptersPrevious = createSelector(slices.player, select('chapters'), chapters.previous);
const chaptersCurrent = createSelector(slices.player, select('chapters'), chapters.current);
const chaptersTitle = createSelector(slices.player, select('chapters'), chapters.title);
const chaptersImage = createSelector(slices.player, select('chapters'), chapters.image);

const translation = (key: string, attr = {}) => ({ key, attr });

export default {
  runtime: {
    initialized: createSelector(slices.runtime, runtime.initialized),
    locale: createSelector(slices.runtime, runtime.locale),
  },
  theme: {
    background: createSelector(slices.theme, theme.background)
  },
  podcast: {
    feed: createSelector(slices.podcast, podcast.feed),
    title: createSelector(slices.podcast, podcast.title),
    image: createSelector(slices.podcast, podcast.image),
    description: createSelector(slices.podcast, podcast.description),
    summary: createSelector(slices.podcast, podcast.summary),
    episodes: createSelector(slices.podcast, podcast.episodes),
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
  show: {
    poster: showPoster,
    title: showTitle
  },
  player: {
    playtime,
    duration,
    playing,
    title: createSelector(
      [episodeTitle, showTitle],
      (episode: string | null, show: string | null) => episode || show
    ),
    image: createSelector(
      [episodePoster, showPoster],
      (episode: string | null, show: string | null) => episode || show
    ),
    quantiles: createSelector(slices.player, select('quantiles'), quantiles.quantiles),
    buffer: createSelector(slices.player, select('network'), network.buffer),
    ghost: {
      time: playerGhostTime,
      active: createSelector(slices.player, select('ghost'), ghost.active),
      chapter: createSelector(
        [chaptersList, playerGhostTime],
        (chapters: PodloveWebPlayerChapter[], ghostPlaytime: number | null) =>
          currentChapterByPlaytime(chapters, ghostPlaytime || 0)
      )
    },
    media: createSelector(slices.player, select('media'), media.media),
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
    path: createSelector(slices.playbar, playbar.path),
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
    chapters: createSelector(slices.playbar, playbar.chapters),
  },
  subscribeButton: {
    visible: createSelector(slices.subscribeButton, subscribeButton.visible)
  },
  router: {
    id: createSelector(slices.router, router.id),
    episode: createSelector(slices.router, router.episode)
  },
  search: {
    query: createSelector(slices.search, search.query),
    visible: createSelector(slices.search, search.visible),
    initialized: createSelector(slices.search, search.initialized),
    loading: createSelector(slices.search, search.loading),
    contributors: createSelector(slices.search, search.contributors),
    episodes: createSelector(slices.search, search.episodes),
    transcripts: createSelector(slices.search, search.transcripts),
    results: createSelector(slices.search, search.results),
    hasResults: createSelector(slices.search, search.hasResults),
    selectedResult: createSelector(slices.search, search.selectedResult)
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
        return translation('A11Y.PLAYER_CHAPTER_CURRENT', current);
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
      return translation('A11Y.PLAYER_PAUSE', chaptersCurrent(state));
    },
    playButtonDuration: (state: State) => {
      const time = {
        duration: duration(state),
        playtime: playtime(state)
      };

      return translation('A11Y.PLAYER_START', {
        hours: calcHours(time.playtime > 0 ? time.playtime : time.duration),
        minutes: calcMinutes(time.playtime > 0 ? time.playtime : time.duration),
        seconds: calcSeconds(time.playtime > 0 ? playtime : time.duration)
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
