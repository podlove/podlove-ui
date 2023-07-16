<template>
  <facebook-channel
    :link="state.link"
    :filled="hover"
    @mouseover.native="mouseOver"
    @mouseleave.native="mouseLeave"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { mapState } from 'redux-vuex';
import { FacebookChannel } from '@podlove/components';

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
