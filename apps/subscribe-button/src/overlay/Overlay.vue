<template>
  <div class="overlay">
    <div class="subscribe-top">
      <cover alt="ccc" :url="cover" :cover-color="color" />
      <div class="podcast-describtion">
        <h1>{{ podcastTitle }}</h1>
        <p>{{ podcastSubTitle }}</p>
        <!-- <p>Bitte die URL kopieren und in deine Podcast- oder RSS-App einfügen.</p>
        <button class="btn-copy" :style='btnColor'>Weiter</button> -->
      </div>
    </div>
    <tabs-component></tabs-component>
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
import { Image } from '@podlove/components'
import TabsComponent from './tabs/tabs'

export default {
  components: { Cover: Image, TabsComponent },
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
@import '~theme/reset';
@import '~theme/variable';

.overlay {
  width: 500px;
  background: #fff;
  padding: 1em;

  img {
    height: $size-big-cover-height;
  }
}

.subscribe-top {
  display: flex;

  .image-container {
    margin-right: 1em;
  }
}

.podcast-describtion {
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
