<template>
  <div id="breakout" class="overlay">
    <div class="upper-part" :style="backgroundGradient">
      <info-view v-if="infoscreen"></info-view>
      <div v-else>
        <div class="header">
          <button class="info-button" @click="showInfo">
            <icon type="info"></icon>
          </button>
          <button id="close-button" @click="onClose">
            <icon type="close" :size="10"></icon>
          </button>
        </div>
        <div class="podcast">
          <div class="podcast-infos">
            <cover alt="ccc" :url="cover" :cover-color="color" />
            <div class="podcast-describtion">
              <h1>{{ podcastTitle }}</h1>
              <p>{{ podcastSubTitle }}</p>
            </div>
          </div>
          <div class="podcast-feed">
            {{ urlText }}
            <span>
              {{ podcastFeed[0].url }}
            </span>
          </div>
          <button class="btn-copy" @click="copyLink">
            <icon type="rss-feed"></icon>
            <span class="btn-copy-txt">{{ $t('COPYURL') }}</span>
          </button>
          <div class="copy-await" :class="{ 'copy-success': success }">
            {{ $t('COPYSUCESS') }}
          </div>
        </div>
      </div>
    </div>
    <link-list v-if="!finishScreenVisible" :data="getClients" @click="showLastScreen"></link-list>
    <finish-screen v-else @click="hideLastScreen"></finish-screen>
    <div class="footer">
      powered by
      <icon type="podlove"></icon>
      podlove
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

import {
  selectColor,
  selectCover,
  selectTitle,
  selectSubTitle,
  selectDescription,
  selectFeed,
  selectInfoVisible,
  selectFinishScreenVisible,
  selectFinishScreenObject
} from 'store/selectors'
import {
  showInfo,
  closeFinishScreen,
  showFinishScreen,
  fillFinishObject,
  resetFinishObject
} from 'store/actions'
import store from 'store'

import { Icon, Image } from '@podlove/components'
import FinishScreen from './components/FinishScreen'
import InfoView from './info'
import LinkList from './components/LinkList'

import { getPlatform } from '@podlove/utils/useragent'

import apps from './clientlist/apps.json'
import web from './clientlist/web.json'
import clients from './clients.json'
export default {
  components: {
    Icon,
    Cover: Image,
    InfoView,
    LinkList,
    FinishScreen
  },
  data() {
    return {
      ...this.mapState({
        color: selectColor,
        cover: selectCover,
        podcastDescription: selectDescription,
        podcastFeed: selectFeed,
        podcastTitle: selectTitle,
        podcastSubTitle: selectSubTitle,
        infoscreen: selectInfoVisible,
        finishScreenVisible: selectFinishScreenVisible,
        finishObject: selectFinishScreenObject
      }),
      success: false,
      plat: getPlatform(),
      client: window.navigator.platform,
      web_apps: [...web.cloud, ...web.platform]
    }
  },
  computed: {
    getOSClients() {
      return apps[this.plat]
    },
    getClients() {
      return clients
    },
    backgroundGradient() {
      // return `background-image: linear-gradient(to top, red, #f06d06);`
      return `background: ${this.color};`
    },
    btnColor() {
      return `background: ${this.color};`
    },
    urlText() {
      return this.$t('URL', { title: this.podcastFeed[0].url })
    }
  },
  methods: {
    copyLink() {
      this.success = copy(this.podcastFeed[0].url)
    },
    onClose() {
      this.$emit('click')
    },
    showInfo() {
      store.dispatch(showInfo())
    },
    hideLastScreen() {
      store.dispatch(closeFinishScreen())
      store.dispatch(resetFinishObject())
    },
    showLastScreen(client, composedUrl) {
      store.dispatch(showFinishScreen())
      store.dispatch(
        fillFinishObject({
          finish_object: {
            ...client,
            ...{ composedUrl: composedUrl }
          }
        })
      )
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
  margin: 1em;
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
  height: $upper-content-height;

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

    #close-button {
      width: auto;
      margin: 2px;
      padding: 4px;
      border-radius: 50%;
      border: 1px solid black;
    }
    .info-button {
      width: auto;
    }
  }
}
.podcast {
  margin: 0em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.podcast-infos {
  display: flex;
  margin-bottom: 1em;
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

.copy-await {
  visibility: hidden;
}

.copy-success {
  visibility: visible;
}

.podcast-feed {
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

.btn-copy-txt {
  margin-left: 0.5em;
}

.footer {
  height: $footer-content-height;
  display: flex;
  align-items: center;
}
</style>
