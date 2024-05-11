<template>
  <component is="style">
    :root {
    {{ colors }}
    }
  </component>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { computed, type ComputedRef } from 'vue';
import { selectors } from '../logic';
import type { Colors } from '../logic/store/stores/colors.store';
import type { ColorTokens } from '../types/color.types';

const state = mapState({
  colors: selectors.colors
});

const colors: ComputedRef<string> = computed(() =>
  Object.entries(state.colors as Colors).reduce(
    (result, [type, values]) => {
      const colorTokens = Object.entries(values as ColorTokens).reduce((result, [token, value]) => [
        ...result,
        `--${type}-color-${token}: ${value.join(',')}`
      ], [] as string[]).join(';') + ';';

      return [
        ...result,
        colorTokens
      ]
    },
    [] as string[]
  ).join('\n')
);
</script>
