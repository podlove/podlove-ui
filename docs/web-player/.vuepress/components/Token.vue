<template>
  <div class="token" :class="{ active }" @click="select()">
    <div class="preview" :style="{ background: color }"></div><div class="name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    color: {
      type: String
    },
    active: {
      type: Boolean
    }
  },

  methods: {
    select() {
      this.$emit('select', this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
  .token {
    cursor: pointer;
    font-size: 1.2em;
    position: relative;
    display: flex;
    align-items: center;

    &.active {
      font-weight: 400;
    }

    .preview {
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-right: 0.5em;
      border-radius: 2px;
      border: 1px solid #ccc;
    }
  }
</style>
