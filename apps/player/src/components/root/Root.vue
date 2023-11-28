<template>
  <div class="podlove-player antialiased text-base" :style="{ ...theme.font }" data-test="root" source="">
    <slot />

  </div>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { fade, lighten } from 'farbraum';
import { isNegative, light, dark } from '@podlove/utils/color';
import select from '../../store/selectors/index.js';

const { locale } = useI18n({ useScope: 'global' });

const theme = mapState({
  language: select.language,
  brand: select.theme.brand,
  brandLightest: select.theme.brandLightest,
  brandDarkest: select.theme.brandDarkest,
  brandDark: select.theme.brandDark,
  contrast: select.theme.contrast,
  alt: select.theme.alt
});

const language = computed(() => theme.language);

onMounted(() => {
  locale.value = language.value;
});

watch(language, (lang) => {
  locale.value = lang;
});

// colors
const progressbarProgressColor = computed(() => fade(theme.brandDark, 0.7));
const overflowStartColor = computed(() => fade(theme.brandDark, 1));
const progressbarGhostColor = computed(() => fade(theme.brandDark, 0.2));
const progressbarBufferBackground = computed(() =>
  isNegative(theme.brandDark) ? fade(light, 0.5) : fade(dark, 0.7)
);
const chaptersProgressBackground = computed(() => fade(theme.brandDark, 0.7));
const chaptersProgressGhost = computed(() => lighten(theme.brandDark, 0.1));

const transcriptsEntryBackgroundActive = computed(() => fade(theme.alt, 0.8));
</script>

<style lang="postcss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.podlove-player {
  --podlove-player--background: v-bind('theme.brandLightest');

  --podlove-player--chapter-current--color: v-bind('theme.brandDark');
  --podlove-player--chapter-next--color: v-bind('theme.brandDark');
  --podlove-player--chapter-previous--color: v-bind('theme.brandDark');

  --podlove-player--divider--color: v-bind('theme.brandDark');

  --podlove-player--episode-subtitle--color: v-bind('theme.contrast');
  --podlove-player--episode-title--color: v-bind('theme.contrast');

  --podlove-player--error--background: v-bind('theme.brandLightest');
  --podlove-player--error--title-color: v-bind('theme.contrast');
  --podlove-player--error--message-color: v-bind('theme.contrast');
  --podlove-player--error--retry-button-color: v-bind('theme.alt');
  --podlove-player--error--retry-button-background: v-bind('theme.brandDark');

  --podlove-player--play-button--color: v-bind('theme.brandLightest');
  --podlove-player--play-button--color-hover: v-bind('theme.brandLightest');
  --podlove-player--play-button--background: v-bind('theme.brandDark');
  --podlove-player--play-button--background-hover: v-bind('theme.brandDarkest');

  --podlove-player--poster--background: v-bind('theme.brandLightest');

  --podlove-player--stepper-button--forward--color: v-bind('theme.brandDark');
  --podlove-player--stepper-button--backward--color: v-bind('theme.brandDark');

  --podlove-player--volume-control--color: v-bind('theme.brandDark');
  --podlove-player--volume-control--background:  v-bind('theme.brandLightest');
  --podlove-player--volume-control--icon-color: v-bind('theme.brandDark');
  --podlove-player--volume-control--progress-color: v-bind('progressbarProgressColor');
  --podlove-player--volume-control--thumb-color: v-bind('theme.brandDark');
  --podlove-player--volume-control--border-color: v-bind('theme.brandDark');

  --podlove-player--progress-bar-live--progress-color: v-bind('progressbarProgressColor');
  --podlove-player--progress-bar-live--track-color: v-bind('theme.brandDark');
  --podlove-player--progress-bar-live--thumb-color: v-bind('theme.brandDark');
  --podlove-player--progress-bar-live--thumb-border-color: v-bind('theme.brandLightest');
  --podlove-player--progress-bar-live--ghost-color: v-bind('progressbarGhostColor');
  --podlove-player--progress-bar-live--ghost-border-color: v-bind('theme.brandLightest');
  --podlove-player--progress-bar-live--buffer-background-color: v-bind('progressbarBufferBackground');
  --podlove-player--progress-bar--progress-color: v-bind('progressbarProgressColor');
  --podlove-player--progress-bar--chapter-separator-color: v-bind('theme.brandLightest');
  --podlove-player--progress-bar--chapter-background-color: v-bind('theme.brandDark');
  --podlove-player--progress-bar--track-color: v-bind('theme.brandDark');
  --podlove-player--progress-bar--thumb-color: v-bind('theme.brandDark');
  --podlove-player--progress-bar--thumb-border-color: v-bind('theme.brandLightest');
  --podlove-player--progress-bar--ghost-color: v-bind('progressbarGhostColor');
  --podlove-player--progress-bar--ghost-border-color: v-bind('theme.brandLightest');
  --podlove-player--progress-bar--buffer-background-color: v-bind('progressbarBufferBackground');

  --podlove-player--publication-date--color: v-bind('theme.contrast');

  --podlove-player--show-title--color: v-bind('theme.brand');

  --podlove-player--speed-control--color: v-bind('theme.brandDark');

  --podlove-player--tab--color: v-bind('theme.alt');
  --podlove-player--tab--background: v-bind('theme.brandDark');
  --podlove-player--tab-overflow--start: v-bind('overflowStartColor');
  --podlove-player--tab-overflow--stop: v-bind('theme.brandDark');
  --podlove-player--tab-trigger--color: v-bind('theme.contrast');
  --podlove-player--tab-trigger--color-active: v-bind('theme.brandDark');

  --podlove-player--tab-playlist--entry--background-hover: v-bind('theme.brandLightest');
  --podlove-player--tab-playlist--entry--color-hover: v-bind('theme.brandDark');

  --podlove-player--tab-share--channels--color: v-bind('theme.brandDark');
  --podlove-player--tab-share--channels--background: v-bind('theme.alt');
  --podlove-player--tab-share--embed--input--color: v-bind('theme.contrast');
  --podlove-player--tab-share--embed--input--background: v-bind('theme.alt');
  --podlove-player--tab-share--embed--input--border: v-bind('theme.brandDark');
  --podlove-player--tab-share--embed--button--color: v-bind('theme.brandDark');
  --podlove-player--tab-share--embed--button--background: v-bind('theme.alt');
  --podlove-player--tab-share--embed--button--border: v-bind('theme.brandDark');

  --podlove-player--tab-transcripts--search-input--color: v-bind('theme.contrast');
  --podlove-player--tab-transcripts--search-input--background: v-bind('theme.brandLightest');
  --podlove-player--tab-transcripts--search-icon--color: v-bind('theme.brandDark');
  --podlove-player--tab-transcripts--search-button--color: v-bind('theme.brandLightest');
  --podlove-player--tab-transcripts--search-button--color-active: v-bind('theme.contrast');
  --podlove-player--tab-transcripts--search-button--background: v-bind('theme.brandDark');
  --podlove-player--tab-transcripts--search-button--background-active: v-bind('theme.brandLightest');
  --podlove-player--tab-transcripts--entry--background-active: v-bind('transcriptsEntryBackgroundActive'),
  --podlove-player--tab-transcripts--entry--background-highlight: v-bind('theme.shadeDark');

  --podlove-player--tab-chapters--entry--background-hover: v-bind('theme.brandLightest');
  --podlove-player--tab-chapters--entry--color-hover: v-bind('theme.brandDark');
  --podlove-player--tab-chapters--entry--progress-background: v-bind('chaptersProgressBackground');
  --podlove-player--tab-chapters--entry--ghost-background: v-bind('chaptersProgressGhost');

  --podlove-player--timer-current--color: v-bind('theme.contrast');
  --podlove-player--timer-duration--color: v-bind('theme.contrast');
  --podlove-player--timer-live--color: v-bind('theme.contrast');

  --podlove-player--subscribe-button--icon-color: v-bind('theme.brandDark');
  --podlove-player--subscribe-button--color: v-bind('theme.brandDark');
  --podlove-player--subscribe-button--border-color: v-bind('theme.brandDark');
  --podlove-player--subscribe-button--background: v-bind('theme.alt');

  --podlove-player--font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --podlove-player--font-weight: 300;
}

.podlove-player {
  background: var(--podlove-player--background);
  font-family: var(--podlove-player--font);
  font-weight: var(--podlove-player--font-weight);
}

.entry-enter-active,
.entry-leave-active {
  transition: height 300ms;

  * {
    transition: opacity 600ms;
  }
}
.entry-enter,
.entry-leave-to {
  height: 0;

  * {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 900ms;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.without-outline {
  a:focus,
  button:focus,
  input:focus,
  textarea:focus {
    outline: none;
  }
}
</style>
