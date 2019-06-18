<template>
  <div>
    <div>logoplatzhalter</div>
    <h1>{{ $t('FINISH-SCREEN.TITLE', { client: finishObject.title }) }}</h1>
    <div>{{ $t('FINISH-SCREEN.SOMETHING-WENT-WRONG') }}</div>
    <button>{{ $t('FINISH-SCREEN.TRY-AGAIN') }}</button>
    <p>
      <a href="">
        {{ $t('FINISH-SCREEN.INSTALL', { client: finishObject.title }) }}
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
  }
}
</script>

<style lang="scss" scoped>
button {
  color: pink;
}
</style>
