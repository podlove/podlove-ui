<template>
  <div :class="dimensions" :style="`background: ${color}`">
    <cover v-if="cover" alt="ccc" :url="cover" :cover-color="color"/>
    <button-component></button-component>
  </div>
</template>

<script>
import ButtonComponent from "./button/button";
import { Image } from "@podlove/components";
import { mapState } from "redux-vuex";
import {
  selectColor,
  selectCover,
  selectFormat,
  selectSize,
  selectStyle
} from "store/selectors";

export default {
  data: mapState({
    color: selectColor,
    cover: selectCover,
    format: selectFormat,
    size: selectSize,
    style: selectStyle
  }),
  computed: {
    dimensions() {
      return `${this.size.toLowerCase()} ${this.format.toLowerCase()} ${this.style.toLowerCase()}`;
    }
  },
  components: { Cover: Image, ButtonComponent }
};
</script>

<style lang="scss">
@import "~normalize-scss";
@import "~theme/reset";
@import "~theme/variable";

.big {
  width: $size-big-width;
  height: $size-big-height;
}
</style>
