<template>
  <div class="max-w-[800px] flex items-center flex-col">
    <Search :query="query" @search="search" :loading="loading" class="mb-10" />
    <Transition name="slide-fade">
      <ul v-if="results.length > 0">
        <PodcastItem
          v-for="podcast in results"
          :title="podcast.title"
          :description="podcast.description"
          :feed="podcast.feed"
          :image="podcast.image"
        />
      </ul>
    </Transition>
    <Transition name="slide-fade">
      <div
        v-if="results.length === 0 && query.length > 0 && loading === false"
        class="border p-4 rounded border-complementary-300"
      >
        Podcast not found? Maybe it's not even registered with
        <a class="text-[rgb(56,126,25)]" href="https://fyyd.de/add-feed">fyyd</a> yet? 😊
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div
        v-if="(searchError || feedError) && !loading"
        class="border p-4 rounded border-complementary-300"
      >
        <span v-if="feedError">Invalid feed, check the url or search for a Podcast. 😓</span>
        <span v-if="searchError"
          >Search failed, maybe something is stuck at
          <a class="text-[rgb(56,126,25)]" href="https://fyyd.de">fyyd</a> 🤔</span
        >
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce, get } from 'lodash-es';
import Search from './components/PodcastSearch.vue';
import PodcastItem from './components/PodcastItem.vue';

const query = ref('');
const loading = ref(false);
const searchError = ref(false);
const feedError = ref(false);

const search = (search: string) => {
  query.value = search;
};

interface ListItem {
  title: string;
  feed: string;
  image: string | null;
  description: string | null;
  author: string | null;
}

const results = ref<ListItem[]>([]);

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_err) {
    return false;
  }
};

const queryFeed = async (url: string, signal: AbortSignal): Promise<ListItem[]> => {
  const feed = await fetch(`/api/feed?url=${url}`, { signal }).then((res) =>
    res.json()
  );

  return [
    {
      title: get(feed, ['show', 'title']),
      feed: url,
      description: get(feed, ['show', 'summary'], null),
      image: get(feed, ['show', 'poster'], null),
      author: get(feed, ['author', 'owner'], null)
    }
  ];
};

const queryFyyd = async (query: string, signal: AbortSignal): Promise<ListItem[]> => {
  const response = await fetch(`https://api.fyyd.de/0.2/search/podcast?title=${query}`, {
    signal
  });
  const data = await response.json();

  return get(data, ['data'], [])
    .map((item: any) => ({
      title: get(item, 'title', null) as string | null,
      image: get(item, 'imgURL', null) as string | null,
      feed: get(item, 'xmlURL', null) as string | null,
      description: get(item, 'description', null) as string | null,
      author: get(item, 'author', null) as string | null
    }))
    .filter(({ title, feed }: { title: string; feed: string }) => title && feed);
};

const handleInput = debounce(
  async (query: string) => {
    const controller = new AbortController();

    loading.value = true;
    searchError.value = false;
    feedError.value = false;

    if (isValidUrl(query)) {
      try {
        results.value = await queryFeed(query, controller.signal);
      } catch (_err) {
        feedError.value = true;
      }
    } else {
      try {
        results.value = await queryFyyd(query, controller.signal);
      } catch (_err) {
        searchError.value = true;
      }
    }

    loading.value = false;
  },
  300,
  { leading: true }
);

watch(query, handleInput);
</script>

<style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
}
</style>
