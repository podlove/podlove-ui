<template><render /></template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';

import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  PodloveWebPlayerTimelineTranscriptEntry,
  PodloveWebPlayerTimelineChapterEntry
} from '@podlove/types';

import select from '../../../store/selectors/index.js';

const { t } = useI18n();

const container = (children = []) =>
  h(
    'div',
    {
      class: {
        entry: true,
        'pb-6': true
      }
    },
    [...children]
  );

const chapter = (children = []) =>
  h(
    'div',
    {
      class: { 'text-lg': true, 'podlove-player--transcript-entry--chapter': true },
      style: chapterStyle.value,
      ...(props.prerender
        ? {}
        : {
            onClick: () => onClick(props.entry)
          })
    },
    [t('TRANSCRIPTS.CHAPTER', { ...props.entry, index: props.entry.index + 1}), ...children]
  );

const speaker = () =>
  h(
    'div',
    {
      class: { '-ml-6': true, 'podlove-player--transcript-entry--speaker': true },
      style: speakerStyle.value
    },
    [
      props.entry.speaker.avatar
        ? h('img', {
            class: {
              'w-4': true,
              'h-4': true,
              'rounded-sm': true,
              'inline-block': true,
              'mr-2': true
            },
            src: props.entry.speaker.avatar
          })
        : null,
      props.entry.speaker.name
        ? h(
            'span',
            {
              class: { 'text-xs': true, uppercase: true, 'opacity-50': true }
            },
            props.entry.speaker.name
          )
        : null
    ]
  );

const transcript = (children = []) =>
  h('div', { class: { transcript: true, 'ml-6': props.entry.speaker } }, [
    props.entry.speaker ? speaker() : null,
    ...children
  ]);

const highlightText = (text) => {
  if (!query.value) {
    return text;
  }

  return text
    .replace(query.value, (matched) => `|||${matched}|||`)
    .split('|||')
    .map((text) =>
      text.match(query.value)
        ? h(
            'span',
            {
              class: { 'podlove-player--transcript-entry--highlight': true }
            },
            text
          )
        : text
    );
};

const text = (transcript, index) =>
  h(
    'span',
    {
      class: {
        'opacity-75': props.playtime > transcript.end,
        'mr-1': index < props.entry.texts.length - 1,
        'active-transcript': activePlaytime(transcript),
        'cursor-pointer':
          !props.prerender && (activePlaytime(transcript) || activeGhost(transcript)),
        'podlove-player--transcript-entry--active':
          !props.prerender && (activePlaytime(transcript) || activeGhost(transcript))
      },
      ...(props.prerender
        ? {}
        : {
            onClick: () => onClick(transcript),
            onMouseover: () => onMouseOver(transcript),
            onMouseleave: () => onMouseLeave(transcript)
          })
    },
    [highlightText(transcript.text)]
  );

const emit = defineEmits(['onClick', 'onMouseLeave', 'onMouseOver']);

const props = defineProps<{
  prerender: boolean;
  entry: PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry;
  playtime: number | null;
  ghostActive: boolean;
  searchQuery: string | null;
  ghostTime: number | null;
  searchResults: number[];
}>();

const state = mapState({
  fontCi: select.theme.fontCi,
  fontBold: select.theme.fontBold
});

const query = computed(() => {
  if (!props.searchQuery || props.searchResults.length === 0) {
    return null;
  }

  return new RegExp(props.searchQuery, 'ig');
});

const chapterStyle = computed(() => state.fontCi);
const speakerStyle = computed(() => state.fontBold);

// Event Bindings
const onClick = (entry) => {
  emit('onClick', entry);
};

const onMouseLeave = (transcript) => {
  emit('onMouseLeave', transcript);
};

const onMouseOver = (transcript) => {
  emit('onMouseOver', transcript);
};

// Utilities
const activePlaytime = (transcript) => {
  if (transcript.start > props.playtime) {
    return false;
  }

  if (transcript.end < props.playtime) {
    return false;
  }

  return true;
};

const activeGhost = (transcript) => {
  if (!props.ghostTime) {
    return false;
  }

  if (!props.ghostActive) {
    return false;
  }

  if (transcript.start > props.ghostTime) {
    return false;
  }

  if (transcript.end < props.ghostTime) {
    return false;
  }

  return true;
};

const render = () =>
  container([props.entry.type === 'chapter' ? chapter() : transcript(props.entry.texts.map(text))]);
</script>

<style lang="postcss">
.podlove-player--transcript-entry--chapter {
}

.podlove-player--transcript-entry--speaker {
}

.podlove-player--transcript-entry--highlight {
  background: var(--podlove-player--tab-transcripts--entry--background-highlight);
}

.podlove-player--transcript-entry--active {
  background: var(--podlove-player--tab-transcripts--entry--background-active);
}
</style>
