<template>
  <div>
    <h1>{{ $t('INFO.HEADLINE') }}</h1>
    <p v-for="(p, index) in $t('INFO.PARAGRAPHS')" :key="index">
      {{ p }}
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
