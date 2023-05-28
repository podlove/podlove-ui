<template><render /></template>

<script lang="ts" setup>
import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const container =
  (children = []) =>
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
      class: { 'text-lg': true },
      style: props.chapterStyle,
      ...(props.prerender
        ? {}
        : {
            onClick: () => onClick(props.entry)
          })
    },
    [t('TRANSCRIPTS.CHAPTER', props.entry), ...children]
  );

const speaker = () =>
  h('div', { class: { '-ml-6': true }, style: props.speakerStyle }, [
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
  ]);

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
    .map((text) => (text.match(query.value) ? h('span', { style: props.highlightStyle }, text) : text));
};

const text = (transcript, index) =>
  h(
    'span',
    {
      class: {
        'opacity-75': props.playtime > transcript.end,
        'mr-1': index < props.entry.texts.length - 1,
        'active-transcript': activePlaytime(transcript)
      },
      style: transcriptStyle(transcript),
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

const props = defineProps({
  prerender: {
    type: Boolean,
    default: false
  },
  entry: {
    type: Object,
    default: () => ({})
  },
  playtime: {
    type: Number,
    default: null
  },
  ghostActive: {
    type: Boolean
  },
  searchQuery: {
    type: String,
    default: ''
  },
  ghostTime: {
    type: Number,
    default: null
  },
  searchResults: {
    type: Array,
    default: () => []
  },
  chapterStyle: {
    type: Object,
    default: () => ({})
  },
  speakerStyle: {
    type: Object,
    default: () => ({})
  },
  highlightStyle: {
    type: Object,
    default: () => ({})
  },
  activeStyle: {
    type: Object,
    default: () => ({})
  }
});

const query = computed(() => {
  if (!props.searchQuery || props.searchResults.length === 0) {
    return null;
  }

  return new RegExp(props.searchQuery, 'ig');
});

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
const transcriptStyle = (transcript) => {
  if (props.prerender) {
    return {};
  }

  if (activePlaytime(transcript)) {
    return props.activeStyle;
  }

  if (activeGhost(transcript)) {
    return props.activeStyle;
  }

  return {};
};

const render = () =>
  container([props.entry.type === 'chapter' ? chapter() : transcript(props.entry.texts.map(text))]);
</script>
