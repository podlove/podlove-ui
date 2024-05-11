<template>
  <custom-transition type="fade">
    <div v-if="state.visible" class="subscribe-overlay fixed inset-0 w-screen h-screen p-4 z-50">
      <div
        class="flex w-full h-full items-center justify-center"
        v-click-outside="toggleSubscribeOverlay"
      >
        <div class="relative bg-gray-100 max-w-4xl w-full rounded shadow-lg p-8 mt-8">
          <button class="absolute right-0 top-0 mr-2 -mt-16 text-gray-100" @click="toggleSubscribeOverlay">
            <close-icon :size="40" />
          </button>
          <h2 class="absolute font-extralight text-3xl text-gray-100 top-0 left-0 ml-5 -mt-16">
            Subscribe
          </h2>
          <div class="overflow-y-auto">
            <h3 class="font-mono inline-block border-primary-400 border-b-2 mb-6">
              {{ $t('SUBSCRIBE_BUTTON.CLIENTS') }}
            </h3>
            <div class="subscribe-clients flex flex-col mb-4 sm:flex-wrap sm:flex-row">
              <div class="w-full mb-4 sm:w-40" v-for="client in items" :key="client?.id">
                <a
                  v-if="client?.link"
                  class="
                    flex
                    items-center
                    flex-row
                    sm:flex-col
                    border-2
                    rounded
                    p-4
                    sm:pt-5
                    whitespace-nowrap
                    border-gray-400
                    mx-2
                    overflow-hidden
                    hover:border-primary-900 hover:shadow hover:bg-complementary-900
                  "
                  :href="client.link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    :style="{ maskImage: `url(${client.icon.src})` }"
                    class="subscribe-client-image w-10 h-10 mb-0 sm:w-10 sm:mb-2"
                  />
                  <span class="font-light text-lg w-11/12 overflow-hidden truncate text-center text-primary-800">{{
                    client.title
                  }}</span></a
                >
              </div>
            </div>
            <h3 class="font-mono inline-block border-primary-400 border-b-2 mb-6">
              {{ $t('SUBSCRIBE_BUTTON.FEED') }}
            </h3>
            <div class="mx-2 mb-4">
              <div
                ref="feed"
                class="
                  rounded
                  p-2
                  w-full
                  border-gray-400 border-2
                  text-primary-800
                  hover:border-primary-800
                  focus:border-primary-800
                  px-2
                  font-light
                  cursor-pointer
                  truncate
                  hover:bg-complementary-900
                  bg-complementary-100
                  appearance-none
                "
                @click="selectText"
              >
                {{ state.feed }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </custom-transition>
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import getClients from '@podlove/clients';
import { type, platform, type PodcatcherClientId } from '@podlove/clients/types';
import { getPlatform } from '@podlove/utils/useragent';
import { CloseIcon } from '@podlove/components';

import CustomTransition from '../../components/CustomTransition.vue';

import vClickOutside from '../../lib/directives/click-outside';
import { actions, selectors } from '../../logic/store';

const feed: Ref<null | HTMLElement> = ref(null);

const store = injectStore();

const state = mapState({
  feed: selectors.podcast.feed,
  visible: selectors.subscribeButton.visible
});

const clients = computed(() => [
  {
    id: 'antenna-pod'
  },
  {
    id: 'beyond-pod'
  },
  {
    id: 'clementine'
  },
  {
    id: 'downcast'
  },
  {
    id: 'google-podcasts',
    service: state.feed
  },
  {
    id: 'itunes'
  },
  {
    id: 'i-catcher'
  },
  {
    id: 'overcast'
  },
  {
    id: 'player-fm'
  },
  {
    id: 'pod-grasp'
  },
  {
    id: 'podcast-addict'
  },
  {
    id: 'podcast-republic'
  },
  {
    id: 'podcat'
  },
  {
    id: 'podscout'
  },
  {
    id: 'rss-radio'
  }
]);

const items = computed(() =>
  clients.value
    .map((client) =>
      getClients({ id: client.id as PodcatcherClientId, platform: [getPlatform(), platform.web] })
        .filter((item) => (item.type === type.service ? !!client.service : true))
        .map((item) => ({
          ...item,
          link: item.type === type.service ? item.scheme(client.service) : item.scheme(state.feed)
        }))
        .sort((item) => (item.type === type.service ? -1 : 0))
        .shift()
    )
    .filter(Boolean)
    .reverse()
);

const toggleSubscribeOverlay = () => store.dispatch(actions.subscribeButton.toggleSubscribeOverlay());
const selectText = () => {
  if (!feed.value) {
    return;
  }

  const selection = window.getSelection()
  const range = document.createRange()
  range.setStart(feed.value, 0)
  range.setEnd(feed.value, 1)

  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
</script>

<style scoped>
.subscribe-overlay {
  background: rgba(var(--gray-color-400), 0.7);
}

.subscribe-clients {
  max-height: calc(100vh - 450px);
  overflow-y: auto;
}

.subscribe-client-image {
  background-color: rgb(var(--primary-color-800));
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 40px;
}
</style>
