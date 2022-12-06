<template>
  <button
    v-if="visibleTab"
    :id="`trigger-${tab}`"
    class="block relative h-10 w-6"
    role="tab"
    :title="title"
    :aria-label="$t(state.a11y.key, { name: tab })"
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

<script>
import { mapState, injectStore } from 'redux-vuex'
import Icon from '@podlove/components/icons/Icon.vue'
import { prop } from 'ramda'

import { toggleTab } from '@podlove/player-actions/tabs'

import select from 'store/selectors'

const availableTabs = ['chapters', 'files', 'shownotes', 'transcripts', 'share', 'playlist']

export default {
  components: {
    Icon
  },
  props: {
    tab: {
      type: String,
      default: null,
      validator: (val) => availableTabs.includes(val)
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return {
      state: mapState({
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
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    activeTab() {
      return !!this.state.tabs[this.tab]
    },
    visibleTab() {
      return prop(this.tab, this.state)
    }
  },
  methods: {
    toggle() {
      this.dispatch(toggleTab(this.tab))
    }
  }
}
</script>
