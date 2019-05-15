<template>
  <div class="overlay">
    <div>headline</div>
    <div class="subscribe-top">
      <cover alt="ccc" :url="cover" :cover-color="color" />
      <div class="podcast-describtion">
        <h1>{{ podcastTitle }}</h1>
        <p>{{ podcastSubTitle }}</p>
        <!-- <p>Bitte die URL kopieren und in deine Podcast- oder RSS-App einfügen.</p>
        <button class="btn-copy" :style='btnColor'>Weiter</button> -->
      </div>
    </div>
    <div></div>
    <details-component></details-component>
    <div>powered by <icon type="podlove"></icon> podlove</div>
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
import { Icon, Image } from '@podlove/components'
import DetailsComponent from './details/details'

export default {
  components: { Icon, Cover: Image, DetailsComponent },
  data: mapState({
    color: selectColor,
    cover: selectCover,
    podcastDescription: selectDescription,
    podcastFeed: selectFeed,
    podcastTitle: selectTitle,
    podcastSubTitle: selectSubTitle
  }),
  computed: {
    btnColor() {
      return `background: ${this.color};`
    }
  },
  methods: {
    testCopy() {
      // console.log('copy testing')
    }
  }
}
</script>

<style lang="scss">
@import '~normalize-scss';
@import '~theme/font';
@import '~theme/reset';
@import '~theme/variable';

.overlay {
  width: 500px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include font();
  font-size: 16px;

  img {
    height: $size-big-cover-height;
  }
}

.subscribe-top {
  display: flex;
  margin: 1em;
  align-items: center;

  .image-container {
    margin-right: 1em;
  }
}

.podcast-describtion {
  text-align: center;

  h1 {
    margin-top: 0px;
  }
}

.app-liste {
  display: flex;
  align-content: flex-start;
}

.btn-copy {
  width: 250px;
  height: 50px;
}
</style>
