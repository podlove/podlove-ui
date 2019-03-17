<template lang="pug">
  p.summary(v-html="content")
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  hyphens: auto;

  ul,
  ol {
    margin-left: 1em;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  li {
    margin-left: 0.25em;
  }

  a {
    font-weight: 500;
  }
}
</style>
