<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { createApp } from '@podlove/subscribe-button';
import { show } from '@podlove/button-actions/overlay';

const root = ref(null);

const config = {
  feed: 'https://der-lautsprecher.de/feed/m4a',
  clients: [
    {
      id: 'youtube',
      service: 'UCHa2JfCd6sVJQdurd6gYWkA'
    },
    {
      id: 'castro'
    },
    {
      id: 'google-podcasts',
      service: 'https://freakshow.fm/feed/m4a'
    },
    {
      id: 'apple-podcasts',
      service: '277518737'
    },
    {
      id: 'rss',
      service: 'https://freakshow.fm/feed/m4a'
    },
    {
      id: 'antenna-pod'
    },
    {
      id: 'custom',
      link: 'http://google.com',
      icon: 'https://cdn4.iconfinder.com/data/icons/pretty-office-part-5-reflection-style/256/Examples.png',
      title: 'Google!',
      platform: 'custom'
    },
    {
      id: 'custom1',
      link: 'http://google.com',
      icon: 'https://cdn4.iconfinder.com/data/icons/pretty-office-part-5-reflection-style/256/Examples.png',
      title: 'Google1!',
      platform: 'custom'
    }
  ]
};

let app;

onMounted(async () => {
  app = await createApp(config);
  app.mount(root.value);
});

const openButton = () => {
  app.store.dispatch(show());
}
</script>

<template>
  <div>
    <button @click="openButton()">Open Subscribe Button</button>
    <div ref="root"></div>
  </div>
</template>
