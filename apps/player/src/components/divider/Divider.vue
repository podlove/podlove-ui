<template>
  <divider :color="state.color" data-test="divider" />
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { Divider } from '@podlove/components';

import select from '../../store/selectors/index.js';

const state = mapState({
  color: select.theme.shadeBase
});
</script>
