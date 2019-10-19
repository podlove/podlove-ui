<template>
  <div>
    <podlove-web-player :episode="episode" @ready="initPlayer" />

    <h4>Config</h4>
    <json-editor :json="episode" @update="updateConfig" height="500px" />
  </div>
</template>

<script>
  import { INIT } from '@podlove/player-actions/types'
  import episode from '../public/fixtures/episode.json'

  export default {
    data () {
      return {
        episode,
        store: null
      }
    },

    methods: {
      initPlayer (store) {
        this.store = store
      },

      updateConfig (payload) {
        this.store.dispatch({
          type: INIT,
          payload
        })
      }
    }
  }
</script>
