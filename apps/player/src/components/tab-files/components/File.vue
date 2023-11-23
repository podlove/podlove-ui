<template>
  <a
    download
    :href="file.url"
    data-test="tab-files--download"
    @mouseover="hover(file)"
    @mouseout="hover()"
    @click="click(file)"
  >
    <div class="flex h-10">
      <span class="h-full flex items-center pr-4">
        <download-icon :filled="true" v-if="icon === 'download'" />
        <audio-file-icon :filled="true" v-if="icon === 'audio-file'" />
        <video-file-icon :filled="true" v-if="icon === 'video-file'" />
        <text-file-icon :filled="true" v-if="icon === 'text-file'" />
        <pdf-file-icon :filled="true" v-if="icon === 'pdf-file'" />
      </span>
      <div class="w-full">
        <h3 :style="state.font">{{ file.title }}</h3>
        <div class="opacity-50 text-sm">
          <span class="uppercase" :style="state.font">{{ type }}</span>
          <span class="px-2">-</span>
          <span>{{ toMegabyte(file.size) }} MB</span>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { compose, includes, defaultTo, toLower } from 'ramda';
import { DownloadIcon, AudioFileIcon, VideoFileIcon, TextFileIcon, PdfFileIcon } from '@podlove/components';
import { toMegabyte } from '@podlove/utils/math';
import { hoverFile, selectFile } from '@podlove/player-actions/files';
import { useI18n } from 'vue-i18n';

import select from '../../../store/selectors/index.js';

const { t } = useI18n();
const isType = (type) => compose(includes(type), toLower, defaultTo(''));
const audio = isType('audio');
const video = isType('video');
const pdf = isType('pdf');
const text = isType('text');

const props = defineProps({
  file: {
    type: Object,
    default: () => ({
      title: null,
      size: null,
      mimeType: null,
      url: null,
      hover: false
    })
  }
});

const state = mapState({
  font: select.theme.fontBold
});

const dispatch = injectStore().dispatch;

const type = computed(() => {
  if (audio(props.file.mimeType)) {
    return t('FILES.TYPES.AUDIO');
  }

  if (video(props.file.mimeType)) {
    return t('FILES.TYPES.VIDEO');
  }

  if (text(props.file.mimeType)) {
    return t('FILES.TYPES.TEXT');
  }

  if (pdf(props.file.mimeType)) {
    return t('FILES.TYPES.PDF');
  }

  return '';
});

const icon = computed(() => {
  if (props.file.hover) {
    return 'download';
  }

  if (audio(props.file.mimeType)) {
    return 'audio-file';
  }

  if (video(props.file.mimeType)) {
    return 'video-file';
  }

  if (text(props.file.mimeType)) {
    return 'text-file';
  }

  if (pdf(props.file.mimeType)) {
    return 'pdf-file';
  }

  return 'download';
});

const hover = (file) => {
  dispatch(hoverFile(file));
};

const click = (file) => {
  dispatch(selectFile(file));
};
</script>
