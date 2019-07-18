<template>
  <div>
    <button id="close-button" @click="hideInfo">
      <icon type="close" :size="10"></icon>
    </button>
    <h1>{{ $t('INFO.HEADLINE') }}</h1>
    <p v-for="(p, index) in $t('INFO.PARAGRAPHS')" :key="index">
      {{ p }}
    </p>
  </div>
</template>

<script>
import { hideInfo } from 'store/actions'
import store from 'store'

import { Icon } from '@podlove/components'
export default {
  components: { Icon },
  methods: {
    hideInfo() {
      store.dispatch(hideInfo())
    }
  }
}
</script>

<style lang="scss" scoped>
#close-button {
  width: auto;
  margin: 2px;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid black;
}

p {
  text-align: justify;
  hyphens: auto;
  word-wrap: break-word;
}
</style>
