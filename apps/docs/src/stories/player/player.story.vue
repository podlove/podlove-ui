<template>
  <Story title="Player" auto-props-disabled>
    <PodlovePlayer :config="config" :episode="episode">
      <player class="w-full">
        <root>
          <div class="tablet:px-6 tablet:pt-6 mobile:px-4 mobile:pt-4 flex flex-col">
            <div class="flex-col items-center mobile:flex tablet:hidden">
              <show-title class="text-sm"></show-title>

              <subscribe-button class="mb-4 mobile:flex tablet:hidden"></subscribe-button>
              <poster class="rounded-sm w-48 shadow overflow-hidden"></poster>
              <divider class="w-full my-6"></divider>
            </div>

            <div class="tablet:flex flex-grow">
              <div class="w-64 mobile:hidden tablet:block tablet:mr-6">
                <poster class="rounded-sm shadow overflow-hidden"></poster>
              </div>
              <div class="w-full">
                <div class="hidden tablet:block">
                  <show-title class="text-base"></show-title>
                  <episode-title class="text-xl desktop:text-2xl"></episode-title>
                  <divider class="w-full my-4"></divider>
                </div>
                <div class="flex items-center justify-between">
                  <div class="block">
                    <play-state on="active">
                      <speed-control class="block"></speed-control>
                    </play-state>
                  </div>

                  <div class="flex">
                    <play-state on="active">
                      <chapter-previous class="mx-2 block"></chapter-previous>
                    </play-state>
                    <play-state on="active">
                      <step-backward class="mx-2 block"></step-backward>
                    </play-state>

                    <play-button class="mx-2 block"></play-button>

                    <play-state on="active">
                      <step-forward class="mx-2 block"></step-forward>
                    </play-state>
                    <play-state on="active">
                      <chapter-next class="mx-2 block"></chapter-next>
                    </play-state>
                  </div>

                  <div class="block">
                    <play-state on="active">
                      <volume-control class="flex items-center"></volume-control>
                    </play-state>
                  </div>
                </div>
                <div class="flex w-full">
                  <progress-bar></progress-bar>
                </div>
                <div class="flex w-full -mt-2">
                  <div class="w-3/12 text-left">
                    <timer-current class="text-sm"></timer-current>
                  </div>
                  <div class="w-6/12 text-center truncate">
                    <play-state on="active">
                      <current-chapter class="text-sm"></current-chapter>
                    </play-state>
                  </div>
                  <div class="w-3/12 text-right">
                    <timer-duration class="text-sm"></timer-duration>
                  </div>
                </div>
              </div>
            </div>
            <divider class="w-full mt-6 mb-3"></divider>
            <div class="flex justify-between">
              <div class="flex mobile:w-full tablet:w-6/12 desktop:w-3/12 justify-between">
                <tab-trigger tab="shownotes">
                  <info-icon></info-icon>
                </tab-trigger>
                <tab-trigger tab="chapters">
                  <chapter-icon></chapter-icon>
                </tab-trigger>
                <tab-trigger tab="transcripts">
                  <transcripts-icon></transcripts-icon>
                </tab-trigger>
                <tab-trigger tab="files">
                  <download-icon></download-icon>
                </tab-trigger>
                <tab-trigger tab="playlist">
                  <playlist-icon></playlist-icon>
                </tab-trigger>
                <tab-trigger tab="share">
                  <share-icon></share-icon>
                </tab-trigger>
              </div>
              <subscribe-button class="mt-1 mobile:hidden tablet:flex"></subscribe-button>
            </div>
          </div>
          <div class="w-full relative overflow-hidden">
            <tab name="shownotes">
              <tab-shownotes></tab-shownotes>
            </tab>
            <tab name="chapters">
              <tab-chapters></tab-chapters>
            </tab>
            <tab name="transcripts">
              <tab-transcripts></tab-transcripts>
            </tab>
            <tab name="files">
              <tab-files></tab-files>
            </tab>
            <tab name="playlist">
              <tab-playlist></tab-playlist>
            </tab>
            <tab name="share">
              <tab-share></tab-share>
            </tab>

          </div>
          <error></error>
        </root>
      </player>
    </PodlovePlayer>
    <template #controls>
      <HstColor title="brand" v-model="brand" />
      <HstColor title="brandDark" v-model="brandDark" />
      <HstColor title="brandDarkest" v-model="brandDarkest" />
      <HstColor title="shadeDark" v-model="shadeDark" />
      <HstColor title="contrast" v-model="contrast" />
      <HstColor title="alt" v-model="alt" />
    </template>
  </Story>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PodlovePlayer from './components/Player.vue';

import defaultConfig from './data/config.json';
import episode from './data/episode.json';

const brand = ref(defaultConfig.theme.tokens.brand);
const brandDark = ref(defaultConfig.theme.tokens.brandDark);
const brandDarkest = ref(defaultConfig.theme.tokens.brandDarkest);
const shadeDark = ref(defaultConfig.theme.tokens.shadeDark);
const contrast = ref(defaultConfig.theme.tokens.contrast);
const alt = ref(defaultConfig.theme.tokens.alt);

const config = computed(() => ({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    tokens: {
      brand,
      brandDark,
      brandDarkest,
      shadeDark,
      contrast,
      alt
    }
  }
}));
</script>
