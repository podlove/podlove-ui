<template>
  <div>
    <podlove-web-player @ready="initPlayer" :config="action.payload" />

    <h4>Type</h4>
    <select v-model="type">
      <option v-for="(action, index) in actions" :key="index" :value="action.type">{{ action.type }} - {{ action.description }}</option>
    </select>

    <h4>Example Payload</h4>
    <json-editor class="editor" @ready="initEditor" @update="updateAction" :json="action" />

    <button class="dispatch-button" @click="dispatch()">Dispatch</button>
  </div>
</template>

<script>
  import example from '../public/fixtures/example.json'
  import * as types from '@podlove/player-actions/types'

  const actions = [{
    type: types.INIT,
    description: 'Initializes Player',
    payload: example
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
    payload: {
      main: '#9b4dca',
      highlight: '#ffffff'
    }
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
  }, {
    type: types.SHOW_COMPONENT_INFO,
    description: 'Shows the info section'
  }, {
    type: types.HIDE_COMPONENT_INFO,
    description: 'Hides the info section'
  }, {
    type: types.SHOW_COMPONENT_INFO_POSTER,
    description: 'Shows the info poster section'
  }, {
    type: types.HIDE_COMPONENT_INFO_POSTER,
    description: 'Hides the info poster section'
  }, {
    type: types.SHOW_COMPONENT_CONTROLS_CHAPTERS,
    description: 'Shows the chapter controls',
  }, {
    type: types.HIDE_COMPONENT_CONTROLS_STEPPERS,
    description: 'Hides the stepper controls'
  }, {
    type: types.SHOW_COMPONENT_TAB,
    description: 'Shows a tab',
    payload: 'download'
  }, {
    type: types.HIDE_COMPONENT_TAB,
    description: 'Hides a tab',
    payload: 'download'
  }, {
    type: types.SHOW_COMPONENT_VOLUME_SLIDER,
    description: 'Shows the volume slider'
  }, {
    type: types.HIDE_COMPONENT_VOLUME_SLIDER,
    description: 'Hides the volume slider'
  }, {
    type: types.SHOW_COMPONENT_RATE_SLIDER,
    description: 'Shows the rate slider'
  }, {
    type: types.HIDE_COMPONENT_RATE_SLIDER,
    description: 'Hides the rate slider'
  }, {
    type: types.SHOW_COMPONENT_PROGRESSBAR,
    description: 'Shows the progress bar'
  }, {
    type: types.HIDE_COMPONENT_PROGRESSBAR,
    description: 'Hides the progress bar'
  }, {
    type: types.SHOW_COMPONENT_CONTROLS_BUTTON,
    description: 'Shows the control button unit'
  }, {
    type: types.HIDE_COMPONENT_CONTROLS_BUTTON,
    description: 'Hides the control button unit'
  }]

  export default {
    name: 'store-dispatch',

    data () {
      return {
        store: null,
        editor: null,
        actions,
        action: {
          type: types.INIT,
          payload: example
        },
        type: types.INIT
      }
    },

    watch: {
      type (val) {
        const { payload, type } = this.actions.find(({ type }) => type === val)

        this.action = { type, payload }

        this.updateEditor()
      }
    },

    methods: {
      initPlayer (store) {
        this.store = store
      },

      initEditor (editor) {
        this.editor = editor
      },

      updateEditor () {
        this.editor.set(this.action)
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

