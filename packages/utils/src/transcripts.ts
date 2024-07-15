import { last, compose, map, is, endsWith, sortBy, prop, reduce, filter } from 'ramda';

import {
  PodloveWebPlayerChapter,
  PodloveWebPlayerSpeaker,
  PodloveWebPlayerTimelineChapterEntry,
  PodloveWebPlayerTimelineTranscriptEntry,
  PodloveWebPlayerTranscript
} from '@podlove/types';
import { secondsToMilliseconds, toPlayerTime } from './time.js';

const mapSpeakers = (speakers: PodloveWebPlayerSpeaker[]) =>
  compose(
    map(
      (
        transcript: PodloveWebPlayerTimelineTranscriptEntry
      ): PodloveWebPlayerTimelineTranscriptEntry => {
        const result = speakers.find(({ id }) =>
          id.startsWith(transcript.speaker as unknown as string)
        );

        return {
          ...transcript,
          speaker: result
        };
      }
    )
  );

const transformChapters = (
  chapters: PodloveWebPlayerChapter[]
): PodloveWebPlayerTimelineChapterEntry[] =>
  chapters.map((chapter, index) => ({
    ...chapter,
    type: 'chapter',
    index: index
  })) as PodloveWebPlayerTimelineChapterEntry[];

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

const transformTranscript = reduce(
  (transcripts: PodloveWebPlayerTimelineTranscriptEntry[], chunk: PodloveWebPlayerTranscript) => {
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
  },
  []
) as (input: PodloveWebPlayerTranscript[]) => PodloveWebPlayerTimelineTranscriptEntry[];

export const createTimeline = (
  transcripts: PodloveWebPlayerTranscript[],
  chapters: PodloveWebPlayerChapter[],
  speakers: PodloveWebPlayerSpeaker[]
): (PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry)[] => {
  const transcriptEntries: PodloveWebPlayerTimelineTranscriptEntry[] = compose(
    mapSpeakers(speakers),
    transformTranscript
  )(transcripts);
  const chapterEntries: PodloveWebPlayerTimelineChapterEntry[] = transformChapters(chapters);
  return sortBy(prop('start'), [...transcriptEntries, ...chapterEntries]) as (
    | PodloveWebPlayerTimelineChapterEntry
    | PodloveWebPlayerTimelineTranscriptEntry
  )[];
};
