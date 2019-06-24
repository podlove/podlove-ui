<template>
  <div>
    <podlove-web-player :episode="episode" @ready="initPlayer" />
    <json-editor @ready="initEditor" :json="{}" />
  </div>
</template>

<script>
  import episode from '../public/fixtures/episode.json'

  export default {
    name: 'store-subscribe',

    data () {
      return {
        episode,
        editor: null
      }
    },

    methods: {
      initPlayer (store) {

        store.subscribe(() => {
          const { lastAction } = store.getState()

          this.editor && this.editor.set(lastAction)
        })
      },

      initEditor (editor) {
        this.editor = editor
      }
    }
  }
</script>
