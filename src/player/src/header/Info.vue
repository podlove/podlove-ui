<template lang="pug">
  div.info#header-info
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .info {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: $padding;

    .title {
      margin-top: 0;
      margin-bottom: $margin / 4;
      font-weight: inherit;
      font-size: 1.8em;

      a, span {
        display: block;
      }
    }

    .show-title {
      margin: 0;
      font-weight: inherit;
      font-size: 1em;
      line-height: 1.2em;
      min-width: 0;

      a, span {
        display: block;
      }
    }

    .description {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }

    .subtitle {
      overflow: hidden;
      margin: 0;
      height: 2.75em;
      line-height: 1.3em;
      font-size: 1.1em;
      font-weight: 100;
      hyphens: auto;
    }
  }

  @media screen and (max-width: $width-m) {
    .info {
      flex-direction: column;
      text-align: center;

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
  }
</style>
