import { put, takeEvery, select, debounce, delay } from 'redux-saga/effects';
import {
  last,
  compose,
  map,
  is,
  endsWith,
  sortBy,
  prop,
  reduce
} from 'ramda';

import {
  setTranscriptsTimeline,
  updateTranscripts,
  setTranscriptsSearchResults,
  searchTranscripts,
  type searchTranscriptsPayload
} from '@podlove/player-actions/transcripts';
import { secondsToMilliseconds, toPlayerTime } from '@podlove/utils/time';
import { transcripts as getTranscripts } from '@podlove/player-config';
import { binarySearch, textSearch } from '@podlove/utils/search';
import { isDefinedAndNotNull } from '@podlove/utils/predicates';
import type { PodloveWebPlayerSpeaker, PodloveWebPlayerChapter, PodloveWebPlayerTimelineChapterEntry,
  PodloveWebPlayerTimelineTranscriptEntry, PodloveWebPlayerTranscript } from '@podlove/types';
import { ready, type initPayload } from '@podlove/player-actions/lifecycle';
import type { Action } from 'redux-actions';
import { backendPlaytime, requestPlaytime, simulatePlaytime, type backendPlaytimePayload, type requestPlaytimePayload, type simulatePlaytimePayload } from '@podlove/player-actions/timepiece';
import { disableGhost } from '@podlove/player-actions/progress';

const transformTime = (time) =>
  is(Number, time) ? secondsToMilliseconds(time) : toPlayerTime(time);

const isNewChunk = (current, last) => {
  if (last === undefined) {
    return true;
  }

  const differentSpeaker = current.speaker !== last.speaker;
  const text = last.texts.reduce((result, item) => result + ' ' + item.text, '');
  const endOfSentence = endsWith('.', text) || endsWith('!', text) || endsWith('?', text);

  return differentSpeaker || (text.length > 500 && endOfSentence);
};

const transformTranscript = reduce((transcripts: PodloveWebPlayerTimelineTranscriptEntry[], chunk: PodloveWebPlayerTranscript) => {
  const lastChunk = last(transcripts);

  if (isNewChunk(chunk, lastChunk)) {
    return [
      ...transcripts,
      {
        type: 'transcript',
        start: transformTime(chunk.start),
        end: transformTime(chunk.end),
        speaker: chunk.speaker,
        texts: [
          {
            start: transformTime(chunk.start),
            end: transformTime(chunk.end),
            text: chunk.text
          }
        ]
      }
    ];
  }

  return [
    ...transcripts.slice(0, -1),
    {
      ...lastChunk,
      end: transformTime(chunk.end),
      texts: [
        ...lastChunk.texts,
        {
          start: transformTime(chunk.start),
          end: transformTime(chunk.end),
          text: chunk.text
        }
      ]
    }
  ];
}, []) as (input: PodloveWebPlayerTranscript[]) => PodloveWebPlayerTimelineTranscriptEntry[];

const transformChapters = (chapters: PodloveWebPlayerChapter[]): PodloveWebPlayerTimelineChapterEntry[] =>
  chapters.map((chapter, index) => ({
    ...chapter,
    type: 'chapter',
    index: index + 1
  })) as PodloveWebPlayerTimelineChapterEntry[];

const mapSpeakers = (speakers: PodloveWebPlayerSpeaker[]) =>
  map((transcript: PodloveWebPlayerTimelineTranscriptEntry): PodloveWebPlayerTimelineTranscriptEntry => {
    const result = speakers.find(({ id }) => id === transcript.speaker as unknown as string);

    return {
      ...transcript,
      speaker: result
    };
  });

export const transcriptsSaga = ({
  selectSpeakers,
  selectChapters,
  selectPlaytime
}: {
  selectSpeakers: (input: any) => PodloveWebPlayerSpeaker[];
  selectChapters: (input: any) => PodloveWebPlayerChapter[];
  selectPlaytime: (input: any) => number;
}) =>
  function* saga() {
    yield takeEvery(ready.toString(), init, { selectSpeakers, selectChapters, selectPlaytime });
  };

export const searchIndex = (transcripts: (PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry)[]) => binarySearch(transcripts.map(({ start }) => start));
export const searchText = (transcripts: (PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry)[]) => textSearch(transcripts.map((entry: PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry) =>
   ((entry as PodloveWebPlayerTimelineTranscriptEntry).texts || []).map(({ text }) => text).join(' ')
));

export const createTimeline = (transcripts: PodloveWebPlayerTranscript[], chapters: PodloveWebPlayerChapter[], speakers: PodloveWebPlayerSpeaker[]): (PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry)[] => {
  const transcriptEntries: PodloveWebPlayerTimelineTranscriptEntry[] = compose(mapSpeakers(speakers), transformTranscript)(transcripts);
  const chapterEntries: PodloveWebPlayerTimelineChapterEntry[] = transformChapters(chapters);

  return sortBy(prop('start'), [...transcriptEntries, ...chapterEntries]) as (PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry)[];
}

export function* init({ selectSpeakers, selectChapters, selectPlaytime }: {
  selectSpeakers: (input: any) => PodloveWebPlayerSpeaker[];
  selectChapters: (input: any) => PodloveWebPlayerChapter[];
  selectPlaytime: (input: any) => number;
}, { payload }: Action<initPayload>) {
  // Bump one cycle so chapters and speakers are available
  yield delay(0);
  const speakers = yield select(selectSpeakers);
  const chapters: PodloveWebPlayerChapter[] = yield select(selectChapters);
  const transcripts = getTranscripts(payload);

  const timeline = createTimeline(transcripts, chapters, speakers);

  // don't run transcripts logic if no transcripts are available
  if (transcripts.length <= 0) {
    return;
  }

  yield put(
    setTranscriptsTimeline({
      timeline,
      hasTranscripts: transcripts.length > chapters.length
    })
  );
  yield takeEvery(backendPlaytime.toString(), update, searchIndex(timeline));
  yield takeEvery(requestPlaytime.toString(), update, searchIndex(timeline));
  yield takeEvery(simulatePlaytime.toString(), debouncedUpdate, searchIndex(timeline));
  yield takeEvery(disableGhost.toString(), resetToPlaytime, searchIndex(timeline), selectPlaytime);
  yield debounce(400, searchTranscripts.toString(), search, searchText(timeline));
}

export function* update(searchFn, { payload }: Action<backendPlaytimePayload | requestPlaytimePayload>) {
  const index: number = searchFn(payload);

  if (isDefinedAndNotNull(index)) {
    yield put(updateTranscripts(index));
  }
}

export function* debouncedUpdate(searchFn, { payload }: Action<simulatePlaytimePayload>) {
  const index = searchFn(payload);
  yield delay(200);

  if (isDefinedAndNotNull(index)) {
    yield put(updateTranscripts(index));
  }
}

export function* resetToPlaytime(searchFn, selectPlaytime: (input: any) => number) {
  const playtime = yield select(selectPlaytime);
  const index = searchFn(playtime);

  if (isDefinedAndNotNull(index)) {
    yield put(updateTranscripts(index));
  }
}

export function* search(searchFn, { payload }: Action<searchTranscriptsPayload>) {
  const results = searchFn(payload);
  yield put(setTranscriptsSearchResults(results || []));
}
