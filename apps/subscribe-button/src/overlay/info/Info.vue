<template>
  <div class="info-overlay" :style="backgroundGradient">
    <button id="close-button" @click="hideInfo">
      <icon type="close" :size="10"></icon>
    </button>
    <div class="info-content">
      <h1>{{ $t('INFO.HEADLINE') }}</h1>
      <p v-for="(p, index) in $t('INFO.PARAGRAPHS')" :key="index">
        {{ p }}
      </p>
    </div>
  </div>
</template>

<script>
import { selectColor } from 'store/selectors'
import { hideInfo } from 'store/actions'
import store from 'store'

import { Icon } from '@podlove/components'
export default {
  components: { Icon },
  data() {
    return {
      ...this.mapState({
        color: selectColor
      })
    }
  },
  computed: {
    backgroundGradient() {
      return 'background-image: linear-gradient(rgba(184, 239, 250, 1.0) 90%, rgba(184, 239, 250, 0.7) 100%);'
    }
  },
  methods: {
    hideInfo() {
      store.dispatch(hideInfo())
    }
  }
}
</script>

<style lang="scss" scoped>
.info-overlay {
  z-index: 99;
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  -webkit-border-top-left-radius: 10px;
  -webkit-border-top-right-radius: 10px;
}
.info-content {
  padding: 0 1.75em;
  h1 {
    margin-top: 0;
  }
}

#close-button {
  width: auto;
  margin: 0.5em;
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
