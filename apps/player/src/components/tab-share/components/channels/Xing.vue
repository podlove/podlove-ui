<template>
  <xing-channel
    :link="state.link"
    :color="state.color"
    :background="state.background"
    :filled="hover"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { mapState } from 'redux-vuex';
import { XingChannel } from '@podlove/components';

import select from '../../../../store/selectors/index.js';

const state = mapState({
  link: select.share.link
});

const hover = ref(false);
const mouseOver = () => {
  hover.value = true;
};
const mouseLeave = () => {
  hover.value = false;
};
</script>
