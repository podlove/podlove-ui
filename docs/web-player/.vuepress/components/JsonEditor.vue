<template>
  <div class="editor-container" :style="{ height: height || '150px' }"></div>
</template>

<script>
  import { equals } from 'ramda'

  export default {
    name: 'json-editor',
    data: {
      value: {}
    },
    props: ['json', 'height', 'mode'],
    methods: {
      onChange (text) {
        try {
          this.value = JSON.parse(text)
          this.$emit('update', this.value)
        } catch (e) {}
      }
    },
    watch: {
      json () {
        if (equals(this.json, this.value)) {
          return
        }

        this.editor.set(this.json)
      }
    },
    mounted () {
      import('jsoneditor/dist/jsoneditor.min').then(Editor => {
        this.editor = new Editor.default(this.$el, {
          search: false,
          onChangeText: this.onChange.bind(this),
          sortObjectKeys: false,
          mode: this.mode || 'code',
          statusBar: false
        })

        this.$emit('ready', this.editor)
        this.editor.set(this.json)
      })
    },
    beforeDestroy() {
      this.editor && this.editor.destroy()
      this.editor = null
    }
  }
</script>

<style lang="scss">
  @import '~jsoneditor/dist/jsoneditor.min.css';
  @import '~milligram-scss/src/Color';

  .jsoneditor {
    border-color: $color-primary !important;
    margin-bottom: 0;

    .jsoneditor-outer.has-main-menu-bar {
      margin-top: 0;
      padding-top: 0;
    }

    .jsoneditor-menu {
      display: none;
    }

    .ace_editor {
      position: static;
    }
  }
</style>
