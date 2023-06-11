<template>
  <channel-base v-bind="$props" type="link" :href="mailLink">
    <icon type="mail" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { queryParameter } from '@podlove/utils/url';
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

const LINK = 'mailto:';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    default: ''
  },
  filled: {
    type: Boolean,
    default: false
  }
});

const mailLink = computed(
  () => `${LINK}?${queryParameter({ body: props.text, subject: props.subject })}`
);
</script>
