<template>
  <channel-base v-bind="$props" type="link" :href="facebookLink">
    <icon type="facebook" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

const LINK = 'https://www.facebook.com/sharer/sharer.php';

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

const facebookLink = computed(() => addQueryParameter(LINK, { u: props.link }));
</script>
