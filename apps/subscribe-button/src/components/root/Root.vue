<template lang="html">
  <div class="antialiased" :style="font">
    <slot></slot>

    <font
      v-for="(font, index) in fonts"
      :key="index"
      :src="font.src"
      :name="font.name"
      :weight="font.weight"
    />
  </div>
</template>

<script>
import Font from '@podlove/components/font'
import { mapState } from 'redux-vuex'
import * as select from 'store/selectors'

export default {
  components: { Font },
  data: mapState({
    font: select.theme.fontRegular,
    fonts: select.theme.fonts
  })
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
