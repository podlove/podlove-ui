<template>
  <div class="finish-screen-container">
    <h2 @click="onClose">
      <icon type="arrow-to-left"></icon>
      Zurück zur Übersicht
    </h2>
    <h3 class="podcatcher-logo">
      <icon :type="finishObject.icon"></icon> {{ finishObject.title }}
    </h3>
    <p>
      {{ $t('FINISH-SCREEN.SOMETHING-WENT-WRONG') }}
      <a id="try-again" :href="finishObject.composedUrl" target="_blank">
        {{ $t('FINISH-SCREEN.TRY-AGAIN') }}
      </a>
    </p>
    <p>
      <a
        v-if="finishObject.platform[finishObject.os]"
        :href="finishObject.platform[finishObject.os].store"
        target="_blank"
      >
        {{ $t('FINISH-SCREEN.INSTALL', { client: finishObject.title }) }}
      </a>
      <a v-else :href="finishObject.url" target="_blank">
        {{ $t('FINISH-SCREEN.REGISTER', { client: finishObject.title }) }}
      </a>
    </p>
  </div>
</template>

<script>
import { selectFinishScreenObject } from 'store/selectors'
import { Icon } from '@podlove/components'
export default {
  components: { Icon },
  data() {
    return {
      ...this.mapState({
        finishObject: selectFinishScreenObject
      })
    }
  },
  methods: {
    onClose() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  cursor: pointer;
  border-bottom: 1px dotted #626262;
  padding-bottom: 0.5em;
}

.podcatcher-logo {
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}

.finish-screen-container {
  padding: 0 1.75em;
}

#try-again {
  color: red;
}
</style>
