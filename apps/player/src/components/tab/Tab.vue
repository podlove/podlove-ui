<template>
  <tab-body
    v-if="active"
    :id="`tab-${name}`"
    :ref="name"
    :active="active"
    :name="name"
    :aria-label="$t(state.a11y.key, { name })"
    :aria-selected="active"
    :background="state.background"
    :style="{ color: state.color }"
    data-test="tab"
    tabindex="1"
  >
    <div class="relative overflow-hidden">
      <slot />
    </div>
  </tab-body>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import { TabBody } from '@podlove/components';

import select from '../../store/selectors/index.js';

const props = defineProps({
  name: {
    type: String,
    default: null
  }
});

const state = mapState({
  background: select.theme.brandDark,
  tabs: select.tabs,
  color: select.theme.alt,
  a11y: select.accessibility.tabPanel(props.name)
});

const active = computed(() => state.tabs[props.name])
</script>
