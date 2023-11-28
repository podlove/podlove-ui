<template>
  <Story title="Subscribe Button" auto-props-disabled>
    <podlove-subscribe-button config="/subscribe-button/config.json" @init="initButton"></podlove-subscribe-button>

    <div class="flex p-48 w-full justify-center items-center">
      <button class="rounded bg-gray-100 shadow p-2" @click="showButton()">Show Button</button>
    </div>
    <template #controls>
      <HstColor title="brand" v-model="brand" />
      <HstColor title="brandDark" v-model="brandDark" />
      <HstColor title="brandDarkest" v-model="brandDarkest" />
      <HstColor title="shadeDark" v-model="shadeDark" />
      <HstColor title="contrast" v-model="contrast" />
      <HstColor title="alt" v-model="alt" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import '@podlove/subscribe-button';
import { show } from '@podlove/button-actions/overlay';
import config from './data/config.json';

let store;

const brand = ref(config.theme.tokens.brand);
const brandDark = ref(config.theme.tokens.brandDark);
const brandDarkest = ref(config.theme.tokens.brandDarkest);
const shadeDark = ref(config.theme.tokens.shadeDark);
const contrast = ref(config.theme.tokens.contrast);
const alt = ref(config.theme.tokens.alt);

const initButton = (event) => {
  store = event.detail;
  store.dispatch(show());
}

const showButton = () => {
  store.dispatch(show());
};
</script>
