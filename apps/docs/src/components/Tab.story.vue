<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon } from '@vitebook/vue/addons'

import TabHeader from '@podlove/components/tab/Header.vue'
import TabHeaderItem from '@podlove/components/tab/HeaderItem.vue'
import TabBody from '@podlove/components/tab/Body.vue'
import Icon from '@podlove/components/icons/Icon.vue'
import Action from '../shared/Action.vue'

const color = ref('#ffffff')
const colorActive = ref('#ff0000')
const background = ref('#000000')
const backgroundActive = ref('#333333')
const tabs = {
  futurama: ref(true),
  dexter: ref(false)
}

const style = ref({
  '--podlove-component-tab-header-item-color': color,
  '--podlove-component-tab-header-item-color-active': colorActive,
  '--podlove-component-tab-header-item-background': background,
  '--podlove-component-tab-body-background': background,
  '--podlove-component-tab-header-item-background-active': backgroundActive
});

function selectTab(selectedTab) {
  Object.keys(tabs).forEach((tab) => {
    tabs[tab].value = tab === selectedTab
  })
}
</script>

<template>
  <div>
    <div style="width: 350px">
      <tab-header :style="style">
        <tab-header-item
          name="futurama"
          :active="tabs.futurama.value"
          display="native"
          :index="0"
          @click="selectTab('futurama')"
        >
          <template #icon><icon type="info"></icon></template>
          <template #title><span>futurama</span></template>
        </tab-header-item>
        <tab-header-item
          name="dexter"
          :active="tabs.dexter.value"
          display="native"
          :index="0"
          @click="selectTab('dexter')"
        >
          <template #icon><icon type="info"></icon></template>
          <template #title><span>dexter</span></template>
        </tab-header-item>
      </tab-header>
      <tab-body
        v-if="tabs.futurama.value"
        ref="info"
        :active="tabs.futurama.value"
        name="futurama"
        :aria-selected="tabs.futurama.value"
        :background="background"
      >
        <h1>For example, if you killed your grandfather, you'd cease to exist!</h1>
        <p>
          Wow, you got that off the Internet? In my day, the Internet was only used to download
          pornography. Morbo can't understand his teleprompter because he forgot how you say that
          letter that's shaped like a man wearing a hat.
        </p>
        <p>
          Um, is this the boring, peaceful kind of taking to the streets? And from now on you're all
          named Bender Jr. <strong> Why would a robot need to drink?</strong>
          <em> It must be wonderful.</em> Who are those horrible orange men?
        </p>
        <h2>Okay, I like a challenge.</h2>
        <p>
          This is the worst kind of discrimination: the kind against me! I videotape every customer
          that comes in here, so that I may blackmail them later. I can explain. It's very valuable.
          I'll get my kit! Tell them I hate them.
        </p>
      </tab-body>

      <tab-body
        v-if="tabs.dexter.value"
        ref="info"
        :active="tabs.dexter.value"
        name="dexter"
        :aria-selected="tabs.dexter.value"
        :background="background"
      >
        <h1>For example, if you killed your grandfather, you'd cease to exist!</h1>
        <p>
          Wow, you got that off the Internet? In my day, the Internet was only used to download
          pornography. Morbo can't understand his teleprompter because he forgot how you say that
          letter that's shaped like a man wearing a hat.
        </p>
        <p>
          Um, is this the boring, peaceful kind of taking to the streets? And from now on you're all
          named Bender Jr. <strong> Why would a robot need to drink?</strong>
          <em> It must be wonderful.</em> Who are those horrible orange men?
        </p>
        <h2>Okay, I like a challenge.</h2>
        <p>
          This is the worst kind of discrimination: the kind against me! I videotape every customer
          that comes in here, so that I may blackmail them later. I can explain. It's very valuable.
          I'll get my kit! Tell them I hate them.
        </p>
      </tab-body>
    </div>

    <ControlsAddon>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Color Active">
        <input v-model="colorActive" type="color" />
      </Action>
      <Action label="Background">
        <input v-model="background" type="color" />
      </Action>
      <Action label="Background Active">
        <input v-model="backgroundActive" type="color" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>
