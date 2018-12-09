<template lang="pug">
  div.poster#header-poster
    div.poster-container(:style="style")
      img.poster-image(:src="posterSrc" :alt="$t(altText)" @error="errorPosterLoad")
</template>

<script>
  import { mapState, mapActions } from 'redux-vuex'
  import select from 'store/selectors'

  export default {
    data: mapState({
      style: select.styles.poster,
      posterSrc: select.header.posterSrc,
      altText: select.accessibility.poster
    }),
    methods: mapActions('errorPosterLoad')
  }
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .poster {
    margin: 0 $margin 0 0;
  }

  .poster-container {
    height: $poster-size;
    line-height: 0;
    border-width: 2px;
    border-style: solid;

    .poster-image {
      max-height: 100%;
      max-width: none;
      width: auto;
    }
  }

  @media screen and (max-width: $width-m) {
    .poster {
      width: 100%;
      display: flex;
      margin: 0 0 $margin 0;
      justify-content: center;
    }

    .poster-container {
      height: calc(#{$poster-size} + 3em); // Height of description
    }
  }
</style>

