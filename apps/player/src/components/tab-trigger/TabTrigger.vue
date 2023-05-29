<template>
  <button
    v-if="visibleTab.value"
    :id="`trigger-${tab}`"
    class="block relative h-10 w-6"
    role="tab"
    :title="title"
    :aria-label="t(state.a11y.key, { name: tab })"
    :aria-selected="activeTab"
    :data-test="`tab-trigger--${tab}`"
    :aria-controls="`tab-${tab}`"
    @click="toggle"
  >
    <span class="block absolute top-0" :style="{ color: state.contrast }">
      <slot />
    </span>
    <span
      v-if="activeTab"
      class="block absolute w-full bottom-0"
      :style="{ color: state.brandDark }"
    >
      <icon class="block m-auto" type="active-tab" />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { prop } from 'ramda';

import { Icon } from '@podlove/components';
import { toggleTab } from '@podlove/player-actions/tabs';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const props = defineProps({
  tab: {
    type: String,
    default: null,
    validator: (val: string) => ['chapters', 'files', 'shownotes', 'transcripts', 'share', 'playlist'].includes(val)
  },
  title: {
    type: String,
    default: ''
  }
});

const state = mapState({
  tabs: select.tabs,
  contrast: select.theme.contrast,
  brandDark: select.theme.brandDark,
  shownotes: select.components.shownotesTab,
  chapters: select.components.chaptersTab,
  transcripts: select.components.transcriptTab,
  share: select.components.shareTab,
  files: select.components.filesTab,
  playlist: select.components.playlistTab,
  a11y: select.accessibility.tabTrigger(props.tab)
});

const dispatch = injectStore().dispatch;

const activeTab = computed(() => !!state.tabs[props.tab]);
const visibleTab = computed(() => prop(props.tab, state));

const toggle = () => {
  dispatch(toggleTab(props.tab));
};
</script>
