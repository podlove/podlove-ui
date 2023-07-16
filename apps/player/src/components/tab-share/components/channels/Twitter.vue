<template>
  <twitter-channel
    :text="shareText"
    :filled="hover"
    @mouseover.native="mouseOver"
    @mouseleave.native="mouseLeave"
  />
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { TwitterChannel } from '@podlove/components';
import { toHumanTime } from '@podlove/utils/time';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import select from '../../../../store/selectors/index.js';
import { computed, ref } from 'vue';

const state = mapState({
  content: select.share.content,
  link: select.share.link,
  episodeTitle: select.episode.title,
  playtime: select.playtime
});

const hover = ref(false);

const mouseOver = () => {
  hover.value = true;
}

const mouseLeave = () => {
  hover.value = false;
}

const shareText = computed(() => {
  if (state.content === 'time') {
    return t('SHARE.EPISODE.TEXT.PLAYTIME', {
      title: state.episodeTitle,
      link: state.link,
      playtime: toHumanTime(state.playtime)
    });
  }

  return t('SHARE.EPISODE.TEXT.BEGINNING', {
    title: state.episodeTitle,
    link: state.link
  });
});
</script>
