<template>
  <div>
    <div>logoplatzhalter</div>
    <h1>{{ $t('FINISH-SCREEN.TITLE', { client: 'iTunes' }) }}</h1>
    <div>{{ $t('FINISH-SCREEN.SOMETHING-WENT-WRONG') }}</div>
    <button>{{ $t('FINISH-SCREEN.TRY-AGAIN') }}</button>
    <p>
      <a href="">
        {{ $t('FINISH-SCREEN.INSTALL', { client: 'iTunes' }) }}
      </a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    client: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    install: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  color: pink;
}
</style>
