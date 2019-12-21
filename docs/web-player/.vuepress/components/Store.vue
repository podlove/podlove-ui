<template>
  <div>
    <podlove-web-player @ready="initPlayer" :episode="action.payload" />

    <h4>Last Action</h4>
    <json-editor @ready="subscribeEditorReady" :json="{}" />

    <h4>Type</h4>
    <select v-model="type">
      <option v-for="(action, index) in actions" :key="index" :value="action.type">{{ action.type }} - {{ action.description }}</option>
    </select>

    <h4>Payload</h4>
    <json-editor class="editor" @ready="dispatchEditorReady" @update="updateAction" :json="action" />

    <button class="dispatch-button" @click="dispatch()">Dispatch</button>
  </div>
</template>

<script>
  import episode from '../public/fixtures/episode.json'
  import config from '../public/fixtures/config.json'
  import * as types from '@podlove/player-actions/types'

  const actions = [{
    type: types.INIT,
    description: 'Initializes Player',
    payload: episode
  }, {
    type: types.REQUEST_PLAY,
    description: 'Plays Podcast',
    payload: {}
  }, {
    type: types.REQUEST_PAUSE,
    description: 'Pauses Podcast',
    payload: {}
  }, {
    type: types.REQUEST_RESTART,
    description: 'Restarts the podcast',
    payload: {}
  }, {
    type: types.SET_THEME,
    description: 'Sets Player Theme',
    payload: { version: 5, theme: config.theme }
  }, {
    type: types.NEXT_CHAPTER,
    description: 'Jumps to the next chapter',
    payload: {}
  }, {
    type: types.PREVIOUS_CHAPTER,
    description: 'Jumps to the previous chapter',
    payload: {}
  }, {
    type: types.SET_CHAPTER,
    description: 'Jumps to a chapter index (starting from 1)',
    payload: 5
  }, {
    type: types.MUTE,
    description: 'Mutes the audio',
    payload: {}
  }, {
    type: types.UNMUTE,
    description: 'Unmutes the audio',
    payload: {}
  }, {
    type: types.SET_VOLUME,
    description: 'Sets the volume (between 0 and 1)',
    payload: 0.5
  }, {
    type: types.SET_RATE,
    description: 'Sets the playback rate (between 0.5 and 4)',
    payload: 1.5
  }, {
    type: types.UPDATE_PLAYTIME,
    description: 'Updates the playback time in milliseconds',
    payload: 10 * 1000 * 60
  }]

  export default {
    name: 'store-dispatch',

    data () {
      return {
        store: null,
        dispatchEditor: null,
        subscribeEditor: null,
        actions,
        action: {
          type: types.INIT,
          payload: episode
        },
        type: types.INIT
      }
    },

    watch: {
      type (val) {
        const { payload, type } = this.actions.find(({ type }) => type === val)

        this.action = { type, payload }

        this.updateDispatchEditor()
      }
    },

    methods: {
      initPlayer (store) {
        this.store = store

        store.subscribe(() => {
          const { lastAction } = store.getState()

          this.subscribeEditor && this.subscribeEditor.set(lastAction)
        })
      },

      dispatchEditorReady (editor) {
        this.dispatchEditor = editor
      },

      subscribeEditorReady (editor) {
        this.subscribeEditor = editor
      },

      updateDispatchEditor () {
        this.dispatchEditor.set(this.action)
      },

      updateSubscribeEditor () {
        this.subscribeEditor.set(this.action)
      },

      updateAction (action) {
        this.action = action
      },

      dispatch() {
        this.store.dispatch(this.action)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor {
    margin-bottom: 1em;
  }

  .dispatch-button {
    display: block;
    width: 100%;
    margin-bottom: 1em;
  }
</style>

