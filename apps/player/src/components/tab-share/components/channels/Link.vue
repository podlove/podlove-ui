<template>
  <tooltip
    trigger="click"
    :content="$t('MESSAGES.COPIED')"
    :color="state.color"
    :background="state.background"
    placement="right"
    @click="copyLink"
  >
    <channel
      type="link"
      :color="state.color"
      :background="state.background"
      :filled="hover"
      @mouseover="hover = true"
      @mouseleavee="hover = false"
    />
  </tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { mapState } from 'redux-vuex';
import copy from '@podlove/utils/copy';
import { Channel, Tooltip } from '@podlove/components';

import select from '../../../../store/selectors/index.js';

const state = mapState({
  link: select.share.link,
  color: select.theme.brandDark,
  background: select.theme.brandLightest
});

const hover = ref(false);

const copyLink = () => {
  copy(state.link);
};
</script>
