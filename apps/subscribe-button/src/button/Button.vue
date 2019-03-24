<template>
  <button id="podlove-subscribe-button">Subscribe</button>
</template>

<script>
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
  }
};
</script>

<style lang="scss">
@import "~normalize-scss";
@import "~theme/reset";
@import "~theme/variable";

button {
  font-weight: 500;
  letter-spacing: 0.5px;

  text-transform: uppercase;
  transition: all 0.1s cubic-bezier(0.62, 0.28, 0.23, 0.99);
  width: 100%;
  font-size: 16px;
}
</style>

