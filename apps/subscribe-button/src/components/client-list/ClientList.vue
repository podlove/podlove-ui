<template>
  <ul class="flex mobile:flex-col tablet:flex-row flex-wrap w-full">
    <li
      v-for="(entry, index) in state.clients"
      :key="index"
      class="block mb-2 mobile:w-full tablet:w-1/2"
      :aria-label="$t('A11Y.CLIENT', entry)"
    >
      <a
        class="flex items-center w-full p-2 hover:bg-gray-200 rounded-sm cursor-pointer"
        rel="noopener"
        target="_blank"
        :style="state.font"
        :href="entry.rss ? null : entry.link"
        @click="onClick(entry)"
      >
        <span class="block w-6 mr-2">
          <img v-if="entry.icon" aria-hidden="true" :src="entry.icon" />
        </span>
        <span class="mr-2">{{ entry.title }}</span>
        <icon type="arrow-to-right"></icon>
      </a>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import * as select from 'store/selectors'

export default {
  components: { Icon },
  setup() {
    return {
      state: mapState({
        clients: select.clients,
        font: select.theme.fontBold
      })
    }
  },

  methods: {
    onClick(client) {
      this.$emit('click', client)
    }
  }
}
</script>
