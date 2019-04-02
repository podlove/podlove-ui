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
      return `${this.size.toLowerCase()}-${this.format.toLowerCase()}`;
      // return `${this.size.toLowerCase()} ${this.format.toLowerCase()} ${this.style.toLowerCase()}`;
    }
  },
  components: { Cover: Image, ButtonComponent }
};
</script>

<style lang="scss">
@import "~normalize-scss";
@import "~theme/reset";
@import "~theme/variable";

.big-rectangle {
  width: $size-big-width;
  height: $size-big-square-rectangle-height;

  .image-container {
    display: none;
  }
}

.big-cover {
  width: $size-big-width;
  height: $size-big-height;
}

.big-square {
  .image-container {
    display: none;
  }
  width: $size-big-square-rectangle-height;
  height: $size-big-square-rectangle-height;
}

.medium-rectangle {
  width: $size-medium-width;
  height: $size-medium-square-rectangle-height;

  .image-container {
    display: none;
  }
}

.medium-cover {
  width: $size-medium-width;
  height: $size-medium-height;
}

.medium-square {
  .image-container {
    display: none;
  }
  width: $size-medium-square-rectangle-height;
  height: $size-medium-square-rectangle-height;
}

.small-rectangle {
  width: $size-small-width;
  height: $size-small-square-rectangle-height;

  .image-container {
    display: none;
  }
}

.small-cover {
  width: $size-small-width;
  height: $size-small-height;
}

.small-square {
  .image-container {
    display: none;
  }
  width: $size-small-square-rectangle-height;
  height: $size-small-square-rectangle-height;
}
</style>
