<template>
  <channel
    type="facebook"
    :link="state.link"
    :color="state.color"
    :background="state.background"
    :filled="hover"
    @mouseover.native="hover.value = true"
    @mouseleave.native="hover.value = false"
  >
    {{ state.link }}
  </channel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { mapState } from 'redux-vuex';
import { Channel } from '@podlove/components';

import select from '../../../../store/selectors/index.js';

const state = mapState({
  link: select.share.link,
  color: select.theme.brandDark,
  background: select.theme.alt
});

const hover = ref(false);
</script>
