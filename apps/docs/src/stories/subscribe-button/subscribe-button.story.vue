<template>
  <Story title="Subscribe Button" auto-props-disabled>
    <div ref="button"></div>
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
import { onMounted, ref } from 'vue';
import '@podlove/subscribe-button/styles';
import { init } from '@podlove/button-actions/lifecycle';
import { show } from '@podlove/button-actions/overlay';

import createButton from '@podlove/subscribe-button';
import config from './data/config.json';

const button = ref(null);

const brand = ref(config.theme.tokens.brand);
const brandDark = ref(config.theme.tokens.brandDark);
const brandDarkest = ref(config.theme.tokens.brandDarkest);
const shadeDark = ref(config.theme.tokens.shadeDark);
const contrast = ref(config.theme.tokens.contrast);
const alt = ref(config.theme.tokens.alt);

const theme = ref({
  brand,
  brandDark,
  brandDarkest,
  shadeDark,
  contrast,
  alt
});

const { app, store } = createButton({ baseUrl: './' });

const showButton = () => {
  store.dispatch(show());
};

const initialize = () => {
  store.dispatch(
    init({
      ...config,
      theme: {
        ...config.theme,
        ...theme
      }
    })
  );
};


onMounted(() => {
  initialize();
  app.mount(button.value);
  store.dispatch(show());
});
</script>
