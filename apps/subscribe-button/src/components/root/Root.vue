<template>
  <div class="antialiased" :style="state.font">
    <slot></slot>

    <inline-style :content="style"></inline-style>
    <font
      v-for="(font, index) in state.fonts"
      :key="index"
      :src="font.src"
      :name="font.name"
      :weight="font.weight"
    />
  </div>
</template>

<script>
import Font from '@podlove/components/font/Font.vue'
import InlineStyle from '@podlove/components/style/Style.vue'
import { mapState } from 'redux-vuex'
import buttonStyle from '../../button.css?inline'

import * as select from '../../store/selectors'

export default {
  components: { Font, InlineStyle },
  setup() {
    return {
      state: mapState({
        font: select.theme.fontRegular,
        fonts: select.theme.fonts
      }),
      style: buttonStyle
    }
  }
}
</script>
