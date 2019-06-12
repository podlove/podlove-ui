<template>
  <div class="overlay">
    <div class="upper-part" :style="backgroundGradient">
      <div class="header">
        <icon type="close"></icon>
        <icon type="podlove"></icon>
        <icon type="info"></icon>
      </div>
      <div class="subscribe-top">
        <cover alt="ccc" :url="cover" :cover-color="color" />
        <div class="podcast-describtion">
          <h1>{{ podcastTitle }}</h1>
          <p>{{ podcastSubTitle }}</p>
        </div>
      </div>
      <div>
        <div class="feed-details">
          {{ urlText }}
          <span id="copy-url-field" @focus="focusURL">
            {{ podcastFeed[0].url }}
          </span>
        </div>
        <button class="btn-copy" @click="testCopy">
          {{ $t('COPYURL') }}
        </button>
      </div>
    </div>
    <details-component></details-component>
    <div class="footer">
      powered by
      <icon type="podlove"></icon>
      podlove
    </div>
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
import DetailsComponent from './details'

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
    backgroundGradient() {
      return `background-image: linear-gradient(to top, red, #f06d06);`
    },
    btnColor() {
      return `background: ${this.color};`
    },
    urlText() {
      return this.$t('URL', { title: this.podcastFeed[0].url })
    }
  },
  methods: {
    focusURL() {
      document.execCommand('selectAll', false, null)
    },
    testCopy() {
      let field = document.querySelector('#copy-url-field')
      field.setAttribute('contenteditable', true)
      field.focus()
      document.execCommand('copy', false, null)
      field.blur()
      field.setAttribute('contenteditable', false)
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
  width: 320px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  -webkit-border-top-left-radius: 10px;
  -webkit-border-top-right-radius: 10px;
  @include font();
  font-size: 14px;

  .image-container {
    width: $size-medium-width;
  }
}

.upper-part {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;

  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  -webkit-border-top-left-radius: 10px;
  -webkit-border-top-right-radius: 10px;

  .header {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.5em;
    align-items: center;
    justify-content: space-between;
  }

  .subscribe-top {
    display: flex;
    margin: 1em;
    align-items: flex-end;

    .image-container {
      margin-right: 1em;
    }
  }

  .podcast-describtion {
    text-align: left;

    h1 {
      margin-top: 0px;
      font-size: 1.5em;
    }

    p {
      margin-bottom: 0px;
    }
  }
}

.feed-details {
  margin-bottom: 0.5em;
}

.app-wrapper {
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
  background: white;
}
</style>
