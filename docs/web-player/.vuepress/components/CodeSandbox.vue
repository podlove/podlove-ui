<template>
  <iframe
    :src="`https://codesandbox.io/embed/${id}?${urlParams}`"
    class="codesandbox"
    :title="title"
    :style="style"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    module: {
      type: String
    },
    initialpath: {
      type: String
    },
    view: {
      type: String,
      default: null,
      validator: view => [null, 'preview', 'editor']
    },
    height: {
      type: Number,
      default: 500
    }
  },

  computed: {
    style() {
      return {
        height: this.height + 'px'
      }
    },

    urlParams() {
      const params = {
        title: this.title,
        module: this.module,
        initialpath: this.initialpath,
        view: this.view,
        autoresize: 1,
        hidenavigation: 1,
        codemirror: 1,
        fontsize: 14
      }

      return Object.keys(params)
        .filter(param => !!params[param])
        .reduce((result, param) => [...result, `${param}=${encodeURIComponent(params[param])}`], [])
        .join('&')
    }
  }
}
</script>

<style lang="scss" scoped>
.codesandbox {
  width: 100%;
  border: 0;
  margin-bottom: 15px;
  border-radius: 4px;
  overflow: hidden;
}
</style>
