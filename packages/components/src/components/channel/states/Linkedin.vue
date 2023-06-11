<template>
  <channel-base v-bind="$props" type="link" :href="linkedinLink">
    <icon type="linkedin" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

const LINK = 'https://www.linkedin.com/shareArticle';

const props = defineProps({
  link: {
    type: String,
    default: null
  },
  text: {
    type: String,
    default: ''
  },
  filled: {
    type: Boolean,
    default: false
  }
});

const linkedinLink = computed(() =>
  addQueryParameter(LINK, { url: props.link, mini: true, summary: props.text })
);
</script>
