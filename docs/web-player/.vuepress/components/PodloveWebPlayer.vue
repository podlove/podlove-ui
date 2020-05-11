<template>
  <div class="player" :id="id" :data-variant="variant" :data-template="template"><slot></slot></div>
</template>

<script>
  export default {
    name: 'PodloveWebPlayer',
    props: {
      episode: {
        type: [String, Object],
        default: () => null
      },
      config: {
        type: [String, Object],
        default: () => null
      },
      id: {
        type: String
      },
      variant: {
        type: String,
        default: null,
        validator: (val) => ['xl', 'l', 'm'].includes(val)
      },
      template: {
        type: String,
        default: null
      }
    },
    mounted: function () {
      window.podlovePlayer(this.$el, this.episode, this.config).then(store => {
        this.$emit('ready', store)
        return store
      }).then(window.registerExternalEvents(this.id))
    }
  }
</script>

<style lang="scss" scoped>
  .player {
    margin-bottom: 1.5em;
  }
</style>
