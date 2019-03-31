import { color } from '@storybook/addon-knobs'

import Tab from '.'
import { color as defaultColor, background as defaultBackground } from 'defaults'
import Icon from '../icons'

export default () => ({
  components: { TabHeader: Tab.Header, TabHeaderItem: Tab.HeaderItem, TabBody: Tab.Body, Icon },
  data() {
    return {
      tabs: {
        futurama: false,
        dexter: false
      }
    }
  },
  props: {
    color: {
      default: color('color', defaultColor)
    },
    colorActive: {
      default: color('colorActive', defaultBackground)
    },
    background: {
      default: color('background', defaultBackground)
    },
    backgroundActive: {
      default: color('backgroundActive', defaultColor)
    }
  },

  template: `
    <div style="width: 350px;">
      <tab-header :colorActive="colorActive">
        <tab-header-item name="futurama" :active="tabs.futurama" display="native" :color="color" :colorActive="colorActive" :background="background" :backgroundActive="backgroundActive" @click="selectTab('futurama')" :index="0">
          <icon type="info" slot="icon"></icon>
          <span slot="title">futurama</span>
        </tab-header-item>
        <tab-header-item name="dexter" :active="tabs.dexter" display="native" :color="color" :colorActive="colorActive" :background="background" :backgroundActive="backgroundActive" @click="selectTab('dexter')" :index="0">
          <icon type="info" slot="icon"></icon>
          <span slot="title">dexter</span>
        </tab-header-item>
      </tab-header>

      <tab-body :active="tabs.futurama" name="futurama" :aria-selected="tabs.info" ref="info" v-if="tabs.futurama" :background="background">
        <h1>For example, if you killed your grandfather, you'd cease to exist!</h1>
        <p>Wow, you got that off the Internet? In my day, the Internet was only used to download pornography. Morbo can't understand his teleprompter because he forgot how you say that letter that's shaped like a man wearing a hat.</p>
        <p>Um, is this the boring, peaceful kind of taking to the streets? And from now on you're all named Bender Jr. <strong> Why would a robot need to drink?</strong> <em> It must be wonderful.</em> Who are those horrible orange men?</p>
        <h2>Okay, I like a challenge.</h2>
        <p>This is the worst kind of discrimination: the kind against me! I videotape every customer that comes in here, so that I may blackmail them later. I can explain. It's very valuable. I'll get my kit! Tell them I hate them.</p>
      </tab-body>

      <tab-body :active="tabs.dexter" name="dexter" :aria-selected="tabs.info" ref="info" v-if="tabs.dexter" :background="background">
        <h1>For example, if you killed your grandfather, you'd cease to exist!</h1>
        <p>Wow, you got that off the Internet? In my day, the Internet was only used to download pornography. Morbo can't understand his teleprompter because he forgot how you say that letter that's shaped like a man wearing a hat.</p>
        <p>Um, is this the boring, peaceful kind of taking to the streets? And from now on you're all named Bender Jr. <strong> Why would a robot need to drink?</strong> <em> It must be wonderful.</em> Who are those horrible orange men?</p>
        <h2>Okay, I like a challenge.</h2>
        <p>This is the worst kind of discrimination: the kind against me! I videotape every customer that comes in here, so that I may blackmail them later. I can explain. It's very valuable. I'll get my kit! Tell them I hate them.</p>
      </tab-body>
    </div>
  `,
  methods: {
    selectTab(tab) {
      Object.keys(this.tabs).forEach(key => {
        this.tabs[key] = tab === key
      })
    }
  }
})
