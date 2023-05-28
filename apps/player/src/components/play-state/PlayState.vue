<template>
  <transition name="fade">
    <slot v-if="active" />
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const props = defineProps({
  on: {
    type: [String, Array],
    default: () => []
  }
});

const state = mapState({
  playstate: select.playstate
});

const matcher = computed(() => (typeof props.on === 'string' ? [props.on] : props.on));
const active = computed(() => matcher.value.includes(state.playstate));
</script>
