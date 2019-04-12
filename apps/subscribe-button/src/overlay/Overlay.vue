<template>
  <div class="overlay">
    <cover alt="ccc" :url="cover" :cover-color="color" />
    <h1>{{ podcastTitle }}</h1>
    <p>{{ podcastSubTitle }}</p>
    <p>Bitte die URL kopieren und in deine Podcast- oder RSS-App einfügen.</p>

    <button-component style="filling"></button-component>
  </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import {
  selectColor,
  selectCover,
  selectTitle,
  selectSubTitle,
  selectDescription,
  selectFeed
} from 'store/selectors'
import ButtonComponent from '../button/button'
import { Image } from '@podlove/components'

export default {
  components: { Cover: Image, ButtonComponent },
  data: mapState({
    color: selectColor,
    cover: selectCover,
    podcastDescription: selectDescription,
    podcastFeed: selectFeed,
    podcastTitle: selectTitle,
    podcastSubTitle: selectSubTitle
  })
}
</script>

<style lang="scss">
@import '~normalize-scss';
@import '~theme/reset';
@import '~theme/variable';

.overlay {
  width: 300px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: $size-big-cover-height;
  }
}
</style>
