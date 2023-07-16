<template>
  <tooltip
    trigger="click"
    :content="t('MESSAGES.COPIED')"
    :color="state.color"
    :background="state.background"
    placement="right"
    @click="copyLink"
  >
    <link-channel
      :filled="hover"
      :link="state.link"
      @mouseover="mouseOver"
      @mouseleavee="mouseLeave"
    />
  </tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState } from 'redux-vuex';
import copy from '@podlove/utils/copy';
import { LinkChannel, Tooltip } from '@podlove/components';

import select from '../../../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  link: select.share.link,
});


const hover = ref(false);
const mouseOver = () => {
  hover.value = true;
};
const mouseLeave = () => {
  hover.value = false;
};

const copyLink = () => {
  copy(state.link);
};
</script>
