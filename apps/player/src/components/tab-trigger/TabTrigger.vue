<template>
  <button
    v-if="visibleTabs[tab]"
    :id="`trigger-${tab}`"
    class="podlove-player--tab-trigger block relative h-10 w-6"
    role="tab"
    :title="title"
    :aria-label="t(state.a11y.key, { name: tab })"
    :aria-selected="activeTab"
    :data-test="`tab-trigger--${tab}`"
    :aria-controls="`tab-${tab}`"
    @click="toggle"
  >
    <span class="podlove-player--tab-trigger--icon block absolute top-0">
      <slot />
    </span>
    <span
      v-if="activeTab"
      class="podlove-player--tab-trigger--icon-active block absolute w-full bottom-0"
    >
      <active-tab-icon class="block m-auto" />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';

import { ActiveTabIcon } from '@podlove/components';
import { toggleTab } from '@podlove/player-actions/tabs';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const props = defineProps<{
  title?: string;
  tab: 'chapters' | 'files' | 'shownotes' | 'transcripts' | 'share' | 'playlist';
}>();

const state = mapState({
  tabs: select.tabs,
  a11y: select.accessibility.tabTrigger(props.tab)
});

const dispatch = injectStore().dispatch;

const visibleTabs = mapState({
  chapters: select.components.chaptersTab,
  files: select.components.filesTab,
  shownotes: select.components.shownotesTab,
  transcripts: select.components.transcriptTab,
  share: select.components.shareTab,
  playlist: select.components.playlistTab
});

const activeTab = computed(() => !!state.tabs[props.tab]);

const toggle = () => {
  dispatch(toggleTab(props.tab));
};
</script>

<style lang="postcss" scoped>
.podlove-player--tab-trigger--icon {
  --podlove-component--icon--color: var(--podlove-player--tab-trigger--color);
}

.podlove-player--tab-trigger--icon-active {
  --podlove-component--icon--color: var(--podlove-player--tab-trigger--color-active);
}
</style>
