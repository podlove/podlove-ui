import MiniSearch from 'minisearch';
import { put, select, takeEvery, all, throttle, call } from 'redux-saga/effects';
import { actions } from '../store';
import type { Episode, Person, Transcript } from '../../types/feed.types';
import type { Action } from 'redux-actions';
import { takeOnce, channel } from '@podlove/player-sagas/helper';
import type {
  EpisodeResult,
  TranscriptResult,
  searchActionPayload
} from '../store/stores/search.store';
import { resolveTranscripts } from '../data/feed-parser';
import { flattenDeep } from 'lodash-es';
import { findPerson } from '../../lib/persons';
import type { EventChannel } from 'redux-saga';

export default ({
  selectVisible,
  selectInitialized,
  selectEpisodes,
  selectContributors,
  selectResults,
  selectSelectedResult
}: {
  selectVisible: (input: any) => boolean;
  selectInitialized: (input: any) => boolean;
  selectEpisodes: (input: any) => Episode[];
  selectContributors: (input: any) => Person[];
  selectResults: (input: any) => { id: string | number }[];
  selectSelectedResult: (input: any) => string | null;
}) => {
  const EPISODES = new MiniSearch({
    fields: [
      'id',
      'title',
      'publicationDate',
      'description',
      'subtitle',
      'link',
      'duration',
      'content',
      'chapters',
      'contributors'
    ],
    storeFields: ['id', 'title', 'episodeId', 'description']
  });

  const TRANSCRIPTS = new MiniSearch({
    fields: ['id', 'text', 'speaker.name'],
    storeFields: ['id', 'text', 'speaker', 'episodeId', 'episodeTitle']
  });

  const CONTRIBUTORS = new MiniSearch({
    fields: ['id', 'episode.title', 'episode.description'],
    storeFields: ['id', 'name', 'avatar']
  });

  function* disableOverflow() {
    document.body.classList.add('overflow-hidden');
  }

  function* enableOverflow() {
    document.body.classList.remove('overflow-hidden');
  }

  function* createEpisodesSearchIndex(episodes: Episode[]) {
    const results = episodes.map((episode) => ({
      ...episode,
      id: `episode-${episode.id}`,
      episodeId: episode.id,
      chapters: episode.chapters
        .map(({ title }) => title)
        .filter(Boolean)
        .join(' '),
      contributors: episode.contributors
        .map(({ name }) => name)
        .filter(Boolean)
        .join(' ')
    }));
    yield EPISODES.addAllAsync(results);
    yield put(actions.search.initialize('episodes'));
  }

  function* fetchTranscripts(episode: Episode) {
    let transcripts: Transcript[] = [];

    if (typeof episode.transcripts === 'string') {
      transcripts = yield resolveTranscripts(
        `/proxy?` + new URLSearchParams({ url: episode.transcripts })
      );
    }

    return { ...episode, transcripts };
  }

  function* createTranscriptsSearchIndex(episodes: Episode[]) {
    const results = episodes.map((episode) =>
      ((episode.transcripts as Transcript[]) || []).map((transcript, index) => ({
        id: `transcript-${episode.id}-${index}`,
        text: transcript.text,
        speaker: transcript.speaker,
        episodeId: episode.id,
        episodeTitle: episode.title
      }))
    );

    yield TRANSCRIPTS.addAllAsync(flattenDeep(results));
    yield put(actions.search.initialize('transcripts'));
  }

  function* createContributorsSearchIndex(contributors: Person[], episodes: Episode[]) {
    const results = contributors.map((contributor) => {
      const attendedEpisodes = episodes.filter((episode) =>
        findPerson(episode.contributors, contributor.id)
      );

      return {
        ...contributor,
        id: `contributor-${contributor.id}`,
        episode: {
          title: attendedEpisodes.map(({ title }) => title).join(' '),
          description: attendedEpisodes.map(({ description }) => description).join(' ')
        }
      };
    });

    yield CONTRIBUTORS.addAllAsync(flattenDeep(results));
    yield put(actions.search.initialize('contributors'));
  }

  function* createSearchIndex() {
    const episodes: Episode[] = yield select(selectEpisodes);
    const contributors: Person[] = yield select(selectContributors);
    const resolvedEpisodes: Episode[] = yield all(episodes.map(fetchTranscripts));

    yield createEpisodesSearchIndex(resolvedEpisodes);
    yield createTranscriptsSearchIndex(resolvedEpisodes);
    yield createContributorsSearchIndex(contributors, resolvedEpisodes);
  }

  function* searchForResults({ payload }: Action<searchActionPayload>) {
    const initialized: boolean = yield select(selectInitialized);
    if (!initialized) {
      return;
    }

    const episodes = EPISODES.search(payload || '', { fuzzy: 0.2 }).slice(
      0,
      5
    ) as unknown as EpisodeResult[];
    const transcripts = TRANSCRIPTS.search(payload || '', {
      fuzzy: 0.2
    }).slice(0, 5) as unknown as TranscriptResult[];
    const contributors = CONTRIBUTORS.search(payload || '', { fuzzy: 0.2 }).slice(
      0,
      5
    ) as unknown as Person[];

    yield put(actions.search.setEpisodeResults(episodes));
    yield put(actions.search.setTranscriptsResults(transcripts));
    yield put(actions.search.setContributorsResults(contributors));
    yield put(actions.search.setResults([...episodes, ...transcripts, ...contributors].length));
  }

  // Keyboard interactions
  function focusResult(id: string) {
    const result: HTMLAnchorElement | null = document.querySelector(`[data-result="${id}"]`);
    result && result.focus();
  }

  function focusSearch() {
    setTimeout(() => {
      const search = document.getElementById('search-input');
      search && search.focus();
    }, 300);
  }

  function* nextResult(modifier: number) {
    const results: { id: string | number }[] = yield select(selectResults);
    const resultsMap = results.map(({ id }) => id.toString());

    if (resultsMap.length === 0) {
      return;
    }

    const selectedResult: string = yield select(selectSelectedResult);

    const index = resultsMap.findIndex((result) => result === selectedResult);
    const size = resultsMap.length - 1;

    let next;

    if (index === -1) {
      next = 0;
    } else {
      next = index + modifier;
    }

    if (next > size) {
      next = 0;
    }

    if (next < 0) {
      next = size;
    }

    focusResult(resultsMap[next]);
  }

  function* handleKeyboardEvent(event: KeyboardEvent) {
    const visible: boolean = yield select(selectVisible);

    if (visible && event.key === 'ArrowUp') {
      yield nextResult(-1);
      event.preventDefault();
    }

    if (visible && (event.key === 'ArrowDown' || event.key === 'Tab')) {
      yield nextResult(1);
      event.preventDefault();
    }

    if (event.metaKey && event.code === 'KeyK') {
      if (!visible) {
        yield put(actions.search.show());
      }

      focusSearch();
    }

    if (visible && event.key === 'Escape') {
      yield put(actions.search.hide());
    }
  }

  return function* () {
    yield takeOnce(actions.search.show.toString(), createSearchIndex);

    yield takeEvery(actions.search.show.toString(), disableOverflow);
    yield takeEvery(actions.search.hide.toString(), enableOverflow);

    yield throttle(300, actions.search.search.toString(), searchForResults);

    const keyboardEvents: EventChannel<KeyboardEvent> = yield call(channel, (cb: EventListener) =>
      document.addEventListener('keydown', cb)
    );

    yield takeEvery(keyboardEvents, handleKeyboardEvent);
  };
};
