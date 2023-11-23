<template>
  <div class="fixed w-full h-full top-0 left-0" :class="{ hidden: !state.overlay }">
    <transition name="fade">
      <root
        v-if="state.overlay"
        ref="root"
        v-click-outside="close"
        class="
          bg-gray-900 bg-opacity-75
          p-6
          fixed
          inset-0
          w-full
          h-full
          flex
          items-center
          justify-center
        "
      >
        <transition name="fade" mode="out-in">
          <client-screen v-if="state.listView" />
          <finish-screen v-else />
        </transition>
      </root>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import * as overlay from '@podlove/button-actions/overlay';
import { computed, onMounted, watch } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';

import Root from './components/root/Root.vue';
import ClientScreen from './screens/Clients.vue';
import FinishScreen from './screens/Finish.vue';

import * as select from './store/selectors.js';

const { locale } = useI18n({ useScope: 'global' });

const state = mapState({
  overlay: select.view.overlay,
  listView: select.view.list,
  finishView: select.view.finish,
  language: select.runtime.language
});

const dispatch = injectStore().dispatch;

const vClickOutside = {
  bind(el: HTMLElement, { value: fn }) {
    el.addEventListener('click', (evt) => {
      if (evt.target !== el) {
        return;
      }

      fn();
    });
  }
};

const language = computed(() => state.language);

onMounted(() => {
  locale.value = language.value;
});

watch(language, (lang) => {
  locale.value = lang;
});

const close = () => {
  dispatch(overlay.hide());
};
</script>
