<template>
  <tab-body
    v-if="active"
    class="podlove-player--tab"
    :id="`tab-${name}`"
    :ref="name"
    :active="active"
    :name="name"
    :aria-label="t(state.a11y.key, { name })"
    :aria-selected="active"
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
import { useI18n } from 'vue-i18n';
import { TabBody } from '@podlove/components';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const props = defineProps<{ name: string }>();

const state = mapState({
  tabs: select.tabs,
  a11y: select.accessibility.tabPanel(props.name)
});

const active = computed(() => state.tabs[props.name]);
</script>

<style lang="postcss" scoped>
.podlove-player--tab {
  color: var(--podlove-player--tab--color);
  --podlove-component--tab-body--background: var(--podlove-player--tab--background);
}
</style>
