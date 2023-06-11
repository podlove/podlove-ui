<template>
  <channel-base v-bind="$props" type="link" :href="xingLink">
    <icon type="xing" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

const LINK = 'https://www.xing.com/spi/shares/new';

const props = defineProps({
  link: {
    type: String,
    default: null
  },
  filled: {
    type: Boolean,
    default: false
  }
});

const xingLink = computed(() => addQueryParameter(LINK, { url: props.link }));
</script>
