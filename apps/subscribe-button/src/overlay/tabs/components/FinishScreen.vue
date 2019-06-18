<template>
  <div>
    <button @click="onClose">
      zurück
    </button>
    <div>logoplatzhalter</div>
    <h1>{{ $t('FINISH-SCREEN.TITLE', { client: finishObject.title }) }}</h1>
    <div>{{ $t('FINISH-SCREEN.SOMETHING-WENT-WRONG') }}</div>
    <p>
      <a id="try-again-btn" :href="finishObject.composedUrl" target="_blank">
        {{ $t('FINISH-SCREEN.TRY-AGAIN') }}
      </a>
    </p>
    <p>
      <a v-if="finishObject.install" :href="finishObject.install" target="_blank">
        {{ $t('FINISH-SCREEN.INSTALL', { client: finishObject.title }) }}
      </a>
      <a v-else :href="finishObject.register" target="_blank">
        {{ $t('FINISH-SCREEN.REGISTER', { client: finishObject.title }) }}
      </a>
    </p>
  </div>
</template>

<script>
import { selectFinishScreenObject } from 'store/selectors'

export default {
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
button {
  color: pink;
}

#try-again-btn {
  color: pink;
  background: white;
  width: 90%;
  height: 2em;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.075em;
}
</style>
