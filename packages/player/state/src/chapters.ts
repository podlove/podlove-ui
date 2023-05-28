import { Action, handleActions } from 'redux-actions';
import { PodloveWebPlayerChapter } from '@podlove/types';

import { prop, compose } from 'ramda';
import {
  setChaptersPayload,
  setChapterPayload,
  updateChapterPayload,
  setChapters,
  setChapter,
  updateChapter
} from '@podlove/player-actions/chapters';

import {
  currentChapterIndex,
  setActiveByPlaytime,
  setActiveByIndex,
  nextChapter as getNextChapter,
  previousChapter as getPreviousChapter,
  currentChapter as getCurrentChapter
} from '@podlove/utils/chapters';

const generateState = (chapters) => ({
  list: chapters,
  current: getCurrentChapter(chapters),
  next: getNextChapter(chapters),
  previous: getPreviousChapter(chapters)
});

export interface State {
  list: PodloveWebPlayerChapter[];
  current: PodloveWebPlayerChapter | null;
  next: PodloveWebPlayerChapter | null;
  previous: PodloveWebPlayerChapter | null;
}

export const INITIAL_STATE: State = {
  list: [],
  current: null,
  next: null,
  previous: null
};

export const reducer = handleActions<
  State,
  setChaptersPayload | setChapterPayload | updateChapterPayload
>(
  {
    [setChapters.toString()]: (_, { payload = [] }: Action<setChaptersPayload>) =>
      generateState(payload.map((item, index) => (index === 0 ? { active: true, ...item } : item))),

    [setChapter.toString()]: (state, { payload }: Action<setChapterPayload>) => {
      const chapters = state.list.map(setActiveByIndex(payload));
      return generateState(chapters);
    },

    [updateChapter.toString()]: (state, { payload }: Action<updateChapterPayload>) => {
      const chapters = state.list.map(setActiveByPlaytime(payload));

      if (currentChapterIndex(chapters) === -1) {
        return state;
      }

      return generateState(chapters);
    }
  },
  INITIAL_STATE
);

export const current = prop('current');
export const selectors = {
  list: prop('list') as (input: State) => PodloveWebPlayerChapter[],
  next: prop('next') as (input: State) => PodloveWebPlayerChapter,
  previous: prop('previous') as (input: State) => PodloveWebPlayerChapter,
  current: prop('current') as (input: State) => PodloveWebPlayerChapter,
  title: compose(prop('title'), current) as (input: State) => string,
  image: compose(prop('image'), current) as (input: State) => string,
};
