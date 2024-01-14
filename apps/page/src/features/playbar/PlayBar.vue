<template>
  <div class="w-full">
    <custom-transition type="playbar">
      <div
        v-if="state.active && !scrolledToBottom"
        class="w-screen fixed bottom-0 play-bar mb-0 z-50 bg-primary-700 bg-opacity-10"
      >
        <div class="w-full absolute progress pl-4 pr-6">
          <div class="font-shadow flex justify-between text-xs -mt-4 font-bold">
            <timer :time="playtime" />
            <timer :time="duration" :remaining="true" />
          </div>
          <progress-bar
            @input="store.dispatch"
            @simulate="store.dispatch"
            @ghost="store.dispatch"
            thumbColor="rgba(255, 255, 255)"
            :duration="duration"
            :time="playtime"
            :ghost="state.ghost"
            :buffer="state.buffer"
            :chapters="state.chapters"
            :quantiles="state.quantiles"
            :title="$t(state.a11yProgressBar.key, state.a11yProgressBar.attr)"
          />
        </div>
        <div class="px-4 py-2 pt-8">
          <div class="flex w-full h-16">
            <div class="flex w-3/4 sm:w-1/2 md:w-1/3">
              <img
                :src="state.poster"
                :width="100"
                :height="100"
                class="w-16 h-16 mr-2 rounded shadow-md"
              />
              <div class="overflow-hidden">
                <a :href="link">
                  <h4 class="text-lg text-gray-100 uppercase truncate">{{ state.title }}</h4>
                </a>
                <a
                  v-if="!state.ghostActive && state.currentChapter && state.currentChapter.index"
                  :href="`${link}?t=${toHumanTime(state.currentChapter.start + 10)}`"
                  class="block w-full text-gray-300 text-sm truncate"
                >
                  {{ state.currentChapter.title }}
                </a>
                <span
                  class="block w-full text-gray-300 text-sm truncate"
                  v-if="state.ghostActive && state.ghostChapter && state.ghostChapter.index"
                  >{{ state.ghostChapter.title }}</span
                >
              </div>
            </div>
            <div class="w-1/4 sm:w-1/2 md:w-1/3 flex items-center justify-center">
              <chapter-button
                v-if="state.chapters.length > 0"
                type="previous"
                color="rgba(255, 255, 255)"
                class="mx-2 hidden sm:block"
                @click="store.dispatch"
                :title="$t(state.a11yChapterPrevious.key, state.a11yChapterPrevious.attr)"
              />
              <stepper-button
                type="backwards"
                class="mx-2 hidden sm:block"
                @click="store.dispatch"
                :title="$t(state.a11yStepperBackwards.key, state.a11yStepperBackwards.attr)"
              />
              <play-button
                background="rgba(255, 255, 255)"
                class="mx-2 rounded-full shadow-none hover:shadow-md"
                :type="state.buttonType"
                @click="store.dispatch"
                :title="playButtonA11y"
              />
              <stepper-button
                type="forward"
                class="mx-2 hidden sm:block"
                @click="store.dispatch"
                :title="$t(state.a11yStepperForward.key, state.a11yStepperForward.attr)"
              />
              <chapter-button
                v-if="state.chapters.length > 0"
                type="next"
                color="rgba(255, 255, 255)"
                class="mx-2 hidden sm:block"
                @click="store.dispatch"
                :title="$t(state.a11yChapterNext.key, state.a11yChapterNext.attr)"
              />
            </div>
            <div class="justify-center items-end w-1/3 flex-col hidden md:flex">
              <div class="flex items-center">
                <button
                  class="flex justify-center items-center mx-2 rounded h-8 w-10 border-transparent"
                  v-if="state.chapters.length > 0"
                  @click="toggleChaptersOverlay"
                  :class="{ 'border-gray-100 border': state.chaptersOverlay }"
                >
                  <chapter-icon />
                </button>
                <button
                  @click="toggleFollowContent"
                  class="flex justify-center items-center mx-2 h-8 w-10 rounded"
                  :class="{ 'border-gray-100 border': state.followContent }"
                >
                  <!-- <lock-icon title="Follow Transcripts" /> -->
                </button>
                <button @click="toggleMute" class="mx-2 ml-4">
                  <speaker-0-icon v-if="state.volumeIcon === 'speaker-0'" />
                  <speaker-25-icon v-if="state.volumeIcon === 'speaker-25'" />
                  <speaker-50-icon v-if="state.volumeIcon === 'speaker-50'" />
                  <speaker-75-icon v-if="state.volumeIcon === 'speaker-75'" />
                </button>
                <div class="w-40 mx-2 mr-4 hidden lg:flex">
                  <input-slider
                    :min="0"
                    :max="1"
                    :value="state.volume"
                    @input="setVolume"
                    :step="0.001"
                    background="rgba(255, 255, 255)"
                    borderColor="rgba(255, 255, 255)"
                  />
                </div>
                <button class="mx-2" @click="nextRate" @dblclick="setRate(1)">
                  <speed050-icon v-if="state.rateIcon === 'speed-050'" />
                  <speed075-icon v-if="state.rateIcon === 'speed-075'" />
                  <speed100-icon v-if="state.rateIcon === 'speed-100'" />
                  <speed125-icon v-if="state.rateIcon === 'speed-125'" />
                  <speed150-icon v-if="state.rateIcon === 'speed-150'" />
                  <speed175-icon v-if="state.rateIcon === 'speed-175'" />
                  <speed200-icon v-if="state.rateIcon === 'speed-200'" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </custom-transition>
    <custom-transition type="chapters">
      <div
        v-if="state.chaptersOverlay"
        class="fixed z-10 chapters-overlay rounded-t text-left font-light text-gray-100"
      >
        <div class="w-full px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 class="uppercase text-lg font-normal leading-none">{{ $t('PLAYBAR.CHAPTERS') }}</h3>
          <button @click="toggleChaptersOverlay">
            <close-icon />
          </button>
        </div>
        <div class="w-full p-2 chapters-list">
          <chapter
            v-for="(chapter, index) in state.chapters"
            :chapter="chapter"
            :index="index"
            :key="`chapter-${index}`"
          />
        </div>
      </div>
    </custom-transition>
  </div>
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { computed, ref, onMounted } from 'vue';
import { toHumanTime } from '@podlove/utils/time';
import { max, get, throttle, isNumber } from 'lodash-es';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

import {
  PlayButton,
  ProgressBar,
  StepperButton,
  ChapterButton,
  InputSlider,
  Timer,
  Speaker0Icon,
  Speaker25Icon,
  Speaker50Icon,
  Speaker75Icon,
  Speed050Icon,
  Speed075Icon,
  Speed100Icon,
  Speed125Icon,
  Speed150Icon,
  Speed175Icon,
  Speed200Icon,
  ChapterIcon,
  CloseIcon
} from '@podlove/components';

import { selectors, actions } from '../../logic/store';

import CustomTransition from '../../components/CustomTransition.vue';

import Chapter from './Chapter.vue';

const store = injectStore();

const scrolledToBottom = ref(false);

const state = mapState({
  feed: selectors.podcast.feed,
  active: selectors.playbar.active,
  episode: selectors.current.episode,
  buttonType: selectors.playbar.button,
  duration: selectors.player.duration,
  playtime: selectors.player.playtime,
  ghost: selectors.player.ghost.time,
  buffer: selectors.player.buffer,
  chapters: selectors.player.chapters.list,
  currentChapter: selectors.player.chapters.current,
  quantiles: selectors.player.quantiles,
  title: selectors.player.title,
  poster: selectors.player.image,
  volumeIcon: selectors.playbar.volume,
  volume: selectors.player.audio.volume,
  rateIcon: selectors.playbar.rate,
  followContent: selectors.playbar.followContent,
  chaptersOverlay: selectors.playbar.chapters,
  ghostChapter: selectors.player.ghost.chapter,
  ghostActive: selectors.player.ghost.active,
  a11yChapterNext: selectors.a11y.chapterNext,
  a11yChapterPrevious: selectors.a11y.chapterPrevious,
  a11yProgressBar: selectors.a11y.progressBar,
  a11yStepperBackwards: selectors.a11y.stepperBackwards,
  a11yStepperForward: selectors.a11y.stepperForward,
  a11yPlayButtonPause: selectors.a11y.playButtonPause,
  a11yPlayButtonDuration: selectors.a11y.playButtonDuration,
  a11yPlayButtonReplay: selectors.a11y.playButtonReplay,
  a11yPlayButtonPlay: selectors.a11y.playButtonPlay,
  a11yPlayButtonError: selectors.a11y.playButtonError
});

const playtime = computed(() => (isNumber(state.ghost) ? state.ghost : state.playtime));
const duration = computed(() => state.duration - (state.ghost ? state.ghost : state.playtime));
const link = computed(() => `/feed/${state.feed}/episodes/${state.episode}`);

const scroll = () => {
  scrolledToBottom.value =
    (max([
      get(window, 'scrollY', 0),
      get(document, ['documentElement', 'scrollTop'], 0),
      get(document, ['body', 'scrollTop'], 0)
    ]) || 0 + window.innerHeight + 5) > document.documentElement.offsetHeight;
};

const setVolume = (volume: number) => store.dispatch(actions.setVolume(volume));
const setRate = (rate: number) => store.dispatch(actions.setRate(rate));
const nextRate = () => store.dispatch(actions.nextRate());
const toggleMute = () => store.dispatch(actions.toggleMute());
const toggleFollowContent = () => store.dispatch(actions.toggleFollowContent());
const toggleChaptersOverlay = () => store.dispatch(actions.toggleChaptersOverlay());

const playButtonA11y = computed(() => {
  switch (state.buttonType) {
    case 'play':
      return t(state.a11yPlayButtonPlay.key, state.a11yPlayButtonPlay.attr);
    case 'pause':
      return t(state.a11yPlayButtonPause.key, state.a11yPlayButtonPause.attr);
    case 'restart':
      return t(state.a11yPlayButtonReplay.key, state.a11yPlayButtonReplay.attr);
    default:
      return '';
  }
});

onMounted(() => {
  const scrollListener = throttle(scroll, 100);
  document && document.addEventListener('scroll', scrollListener);
});
</script>

<style>
.progress {
  margin-top: -5px;
}

.font-shadow {
  text-shadow: 0 0 3px white;
}

.chapters-overlay {
  width: 450px;
  bottom: 104px;
  right: 100px;
}

.chapters-list {
  max-height: calc(100vh - 250px);
  overflow-x: auto;
}

.chapter-progress {
  overflow: hidden;
}

.chapter-progress .title {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
