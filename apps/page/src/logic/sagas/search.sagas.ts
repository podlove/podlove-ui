import * as fuzzySearch from '@m31coding/fuzzy-search';
import { flattenDeep } from 'lodash-es';
import { put, select, takeEvery, call, debounce } from 'redux-saga/effects';
import type { Action } from 'redux-actions';
import type { EventChannel } from 'redux-saga';
import { takeOnce, channel } from '@podlove/player-sagas/helper';
import type {
  EpisodeResult,
  TranscriptResult,
  searchActionPayload
} from '../store/stores/search.store';
import { actions } from '../store';
import { resolveTranscripts } from '../data/feed-parser';
import type { Episode, Person, Transcript } from '../../types/feed.types';
// import { findPerson } from '../../lib/persons';
import { proxy, addQueryparams } from '../../lib/url';
import * as indexeddb from '../../lib/indexeddb';

export default ({
  selectVisible,
  selectInitialized,
  selectEpisodes,
  // selectContributors,
  selectResults,
  selectSelectedResult,
  selectCacheKey,
  selectVersion
}: {
  selectVisible: (input: any) => boolean;
  selectInitialized: (input: any) => boolean;
  selectEpisodes: (input: any) => Episode[];
  // selectContributors: (input: any) => Person[];
  selectResults: (input: any) => { id: string | number }[];
  selectSelectedResult: (input: any) => string | null;
  selectCacheKey: (input: any) => string | null;
  selectVersion: (input: any) => string | null;
}) => {
  const EPISODES = fuzzySearch.SearcherFactory.createDefaultSearcher();
  const TRANSCRIPTS = fuzzySearch.SearcherFactory.createDefaultSearcher();
  // const CONTRIBUTORS = fuzzySearch.SearcherFactory.createDefaultSearcher();

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

    EPISODES.indexEntities(
      results,
      (e: any) => e.id,
      (e: any) => [e.title, e.description, e.chapters, e.contributors, e.content, e.subtitle]
    );

    yield put(actions.search.initialize('episodes'));
  }

  function* resolveEpisodes(episodes: Episode[]) {
    const version: string = yield select(selectVersion);
    const cacheKey: string = yield select(selectCacheKey);

    const db: IDBDatabase = yield indexeddb.open(`episodes@${version}`, {
      onCreate: indexeddb.createStore('transcripts', { keyPath: 'url' }, [
        { name: 'url', keyPath: 'url', options: { unique: true } }
      ])
    });

    const transcriptsDb = indexeddb.transaction('transcripts', db);

    const results: Episode[] = yield Promise.all(
      episodes.map(async (episode) => {
        // are even transcripts available
        if (typeof episode.transcripts !== 'string') {
          return episode;
        }

        const transcriptUrl = addQueryparams(episode.transcripts, { cacheKey });

        // database lookup
        const stored: {
          url: string;
          transcripts: Transcript[];
        } | null = await transcriptsDb.find<{
          url: string;
          transcripts: Transcript[];
        }>('url', transcriptUrl);

        if (stored !== null) {
          return {
            ...episode,
            transcripts: stored.transcripts
          };
        }

        let resolved: Transcript[] = [];

        // persist episodes
        try {
          // transcripts needs to be fetched
          resolved = await resolveTranscripts(proxy(transcriptUrl));

          await transcriptsDb.save({ url: transcriptUrl, transcripts: resolved });
        } catch (err) {
          console.error(err);
        }

        return {
          ...episode,
          transcripts: resolved
        };
      })
    );

    return results;
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

    TRANSCRIPTS.indexEntities(
      flattenDeep(results),
      (e: any) => e.id,
      (e: any) => [e.text, e.speaker.name]
    );

    yield put(actions.search.initialize('transcripts'));
  }

  // function* createContributorsSearchIndex(contributors: Person[], episodes: Episode[]) {
  //   const results = contributors.map((contributor) => {
  //     const attendedEpisodes = episodes.filter((episode) =>
  //       findPerson(episode.contributors, contributor.id)
  //     );

  //     return {
  //       ...contributor,
  //       id: `contributor-${contributor.id}`,
  //       episode: {
  //         title: attendedEpisodes.map(({ title }) => title).join(' '),
  //         description: attendedEpisodes.map(({ description }) => description).join(' ')
  //       }
  //     };
  //   });

  //   CONTRIBUTORS.indexEntities(
  //     flattenDeep(results),
  //     (e: any) => e.id,
  //     (e: any) => [e.episode.title, e.episode.description]
  //   );

  //   yield put(actions.search.initialize('contributors'));
  // }

  function* createSearchIndex() {
    const episodes: Episode[] = yield select(selectEpisodes);
    // const contributors: Person[] = yield select(selectContributors);
    const resolvedEpisodes: Episode[] = yield resolveEpisodes(episodes);
    yield createEpisodesSearchIndex(resolvedEpisodes);
    yield createTranscriptsSearchIndex(resolvedEpisodes);
    // yield createContributorsSearchIndex(contributors, resolvedEpisodes);
  }

  function* searchForResults({ payload }: Action<searchActionPayload>) {
    const initialized: boolean = yield select(selectInitialized);
    if (!initialized) {
      return;
    }

    const episodes = EPISODES.getMatches(new fuzzySearch.Query(payload || '', 5, 0.1)).matches.map(
      (match) => match.entity
    ) as unknown as EpisodeResult[];

    // const contributors = CONTRIBUTORS.getMatches(
    //   new fuzzySearch.Query(payload || '', 5)
    // ).matches.map((match) => match.entity) as unknown as Person[];

    const transcripts = TRANSCRIPTS.getMatches(
      new fuzzySearch.Query(payload || '', 5, 0.1)
    ).matches.map((match) => match.entity) as unknown as TranscriptResult[];

    yield put(actions.search.setEpisodeResults(episodes));
    yield put(actions.search.setTranscriptsResults(transcripts));
    // yield put(actions.search.setContributorsResults(contributors));
    yield put(actions.search.setResults([...episodes, ...transcripts].length));
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
    yield debounce(300, actions.search.search.toString(), searchForResults);

    const keyboardEvents: EventChannel<KeyboardEvent> = yield call(channel, (cb: EventListener) =>
      document.addEventListener('keydown', cb)
    );

    yield takeEvery(keyboardEvents, handleKeyboardEvent);
  };
};
