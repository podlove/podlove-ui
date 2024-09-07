import { get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';
import { PodloveWebPlayerChapter } from '@podlove/types';

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
    [setChapters.toString()]: (_, { payload }: Action<setChaptersPayload>) => {
      return generateState(payload.map((item, index) => (index === 0 ? { active: true, ...item } : item)))
    },

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

export const current = (state: State) => state.current;
export const selectors = {
  list: (state: State) => state.list,
  next: (state: State) => state.next,
  previous: (state: State) => state.previous,
  current: (state: State) => state.current,
  title: (state: State) => get(state, ['current', 'title']),
  image: (state: State) => get(state, ['current', 'image'])
};
