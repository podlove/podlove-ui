import { handleActions, createAction, type Action } from 'redux-actions'
import { createSelector } from 'reselect';

import * as driver from '@podlove/player-state/driver';
import * as show from '@podlove/player-state/show';
import * as media from '@podlove/player-state/media';
import * as timepiece from '@podlove/player-state/timepiece';
import * as episode from '@podlove/player-state/episode';
import * as audio from '@podlove/player-state/audio';
import * as network from '@podlove/player-state/network';
import * as ghost from '@podlove/player-state/ghost';
import * as chapters from '@podlove/player-state/chapters';
import * as quantiles from '@podlove/player-state/quantiles';

type selectEpisodePayload = string;

export interface playEpisodePayload {
  id: string;
  playtime?: number;
}

export type restoreEpisodePayload = playEpisodePayload;

export const actions = {
  playEpisode: createAction<playEpisodePayload>('EPISODE_PLAY'),
  pauseEpisode: createAction<void>('EPISODE_PAUSE'),
  selectEpisode: createAction<selectEpisodePayload>('EPISODE_SELECT'),
  restoreEpisode: createAction<restoreEpisodePayload>('EPISODE_RESTORE'),
}

interface EpisodeState {
  episode: string | null;
}

export interface State {
  quantiles: quantiles.State,
  chapters: chapters.State,
  ghost: ghost.State,
  network: network.State,
  driver: driver.State,
  show: show.State,
  media: media.State,
  timepiece: timepiece.State,
  episode: episode.State,
  audio: audio.State,
  current: EpisodeState
}

export const reducer = handleActions<EpisodeState, any>(
  {
    [actions.selectEpisode.toString()]: (state, { payload }: Action<selectEpisodePayload>) => ({
      ...state,
      episode: payload
    })
  },
  {
    episode: null
  }
);

const getTimePiece = (input: State) => input.timepiece;
const getShow = (input: State) => input.show;
const getEpisode = (input: State) => input.episode;
const getDriver = (input: State) => input.driver;
const getCurrent = (input: State) => input.current;
const getAudio = (input: State) => input.audio;
const getGhost = (input: State) => input.ghost;
const getChapters = (input: State) => input.chapters;
const getQuantiles = (input: State) => input.quantiles;
const getNetwork = (input: State) => input.network;
const getMedia = (input: State) => input.media;

export const selectors = {
  episode: (state: State) => state.episode,
  playtime: createSelector(getTimePiece, timepiece.selectors.playtime),
  livesync: createSelector(getTimePiece, timepiece.selectors.livesync),
  duration: createSelector(getTimePiece, timepiece.selectors.duration),
  showTitle: createSelector(getShow, show.selectors.title),
  showPoster: createSelector(getShow, show.selectors.poster),
  episodeTitle: createSelector(getEpisode, episode.selectors.title),
  episodePoster: createSelector(getEpisode, episode.selectors.poster),
  playing: createSelector(getDriver, driver.selectors.playing),
  currentEpisode: createSelector(getCurrent, (state: EpisodeState) => state.episode),
  volume: createSelector(getAudio, audio.selectors.volume),
  muted: createSelector(getAudio, audio.selectors.muted),
  rate: createSelector(getAudio, audio.selectors.rate),
  ghostTime: createSelector(getGhost, ghost.selectors.time),
  ghostActive: createSelector(getGhost, ghost.selectors.active),
  chaptersList: createSelector(getChapters, chapters.selectors.list),
  chaptersNext: createSelector(getChapters, chapters.selectors.next),
  chaptersPrevious: createSelector(getChapters, chapters.selectors.previous),
  chaptersCurrent: createSelector(getChapters, chapters.selectors.current),
  chaptersTitle: createSelector(getChapters, chapters.selectors.title),
  chaptersImage: createSelector(getChapters, chapters.selectors.image),
  quantiles: createSelector(getQuantiles, quantiles.selectors.quantiles),
  buffer: createSelector(getNetwork, network.selectors.buffer),
  media: createSelector(getMedia, media.selectors.media),
}
