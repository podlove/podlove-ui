<template>
  <a :href="facebookLink" class="channel-link" target="_blank">
    <span class="channel-icon facebook" aria-hidden="true"><icon type="facebook" color="#fff" /></span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
  import Icon from '../../icons'
  import { addQueryParameter } from '@podlove/utils/url'

  const LINK = 'https://www.facebook.com/sharer/sharer.php'

  export default {
    props: {
      link: {
        type: String
      },
      a11y: {
        type: String
      }
    },
    computed: {
      facebookLink () {
        return addQueryParameter(LINK, { u: this.link })
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss">
  $channel-color: #3b5998;

  .channel-icon.facebook {
    background-color: $channel-color;
  }
</style>

