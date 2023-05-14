<template>
  <div class="mb-6" data-test="tab-title">
    <div class="flex justify-between">
      <h1 class="text-xl mb-4" :style="state.font">
        <slot />
      </h1>
      <button
        class="h-6 mt-1"
        data-test="tab-title--close"
        :title="$t(state.title.key, state.title.attr)"
        @click="close"
      >
        <icon type="close" aria-hidden="true" />
      </button>
    </div>
    <div
      :style="{ 'border-color': state.dividerColor }"
      class="border-dotted border-b-2 w-full"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import select from 'store/selectors'

export default {
  components: { Icon },
  props: {
    tab: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      state: mapState({
        font: select.theme.fontCi,
        title: select.accessibility.closeTab(props.tab),
        dividerColor: select.theme.alt
      })
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
