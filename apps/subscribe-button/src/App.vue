<template>
  <div class="background">
    <div :class="dimensions">
      <cover v-if="format === 'cover'" alt="ccc" :url="cover" :cover-color="color" />
      <button-component :clickevent="testClick" :sb="true"></button-component>
    </div>

    <overlay-component></overlay-component>
  </div>
</template>
<script>
import ButtonComponent from './button/button'
import OverlayComponent from './overlay/overlay'
// import { getPlattform } from '@podlove/utils/useragent'
import { Image } from '@podlove/components'
import { mapState } from 'redux-vuex'
import { selectColor, selectCover, selectFormat, selectSize, selectStyle } from 'store/selectors'

export default {
  components: { Cover: Image, ButtonComponent, OverlayComponent },
  data: mapState({
    color: selectColor,
    cover: selectCover,
    format: selectFormat,
    size: selectSize,
    style: selectStyle
  }),
  computed: {
    dimensions() {
      return `${this.size.toLowerCase()}-${this.format.toLowerCase()}`
    }
  },
  methods: {
    testClick() {
      // console.log(getPlattform())
    }
  }
}
</script>

<style lang="scss">
@import '~normalize-scss';
@import '~theme/font';
@import '~theme/reset';
@import '~theme/variable';

.background {
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  @include font();
  font-size: 14px;

  > * {
    margin: 20px;
  }
}

.big-rectangle {
  width: $size-big-width;
  height: $size-big-square-rectangle-height;

  button {
    height: $size-big-square-rectangle-height;
  }
}

.big-cover {
  width: $size-big-width;
  height: calc($size-big-cover-height + $size-big-square-rectangle-height);

  img {
    height: $size-big-cover-height;
  }
  button {
    height: $size-big-square-rectangle-height;
  }
}

.big-square {
  width: $size-big-square-rectangle-height;
  height: $size-big-square-rectangle-height;

  button {
    height: $size-big-square-rectangle-height;
  }
}

.medium-rectangle {
  width: $size-medium-width;
  height: $size-medium-square-rectangle-height;

  button {
    height: $size-medium-square-rectangle-height;
  }
}

.medium-cover {
  width: $size-medium-width;
  height: calc($size-medium-cover-height + $size-medium-square-rectangle-height);

  img {
    height: $size-medium-cover-height;
  }
  button {
    height: $size-medium-square-rectangle-height;
  }
}

.medium-square {
  width: $size-medium-square-rectangle-height;
  height: $size-medium-square-rectangle-height;

  button {
    height: $size-medium-square-rectangle-height;
  }
}

.small-rectangle {
  width: $size-small-width;
  height: $size-small-square-rectangle-height;

  button {
    height: $size-small-square-rectangle-height;
  }
}

.small-cover {
  width: $size-small-width;
  height: calc($size-small-cover-height + $size-small-square-rectangle-height);

  img {
    height: $size-small-cover-height;
  }
  button {
    height: $size-small-square-rectangle-height;
  }
}

.small-square {
  width: $size-small-square-rectangle-height;
  height: $size-small-square-rectangle-height;

  button {
    height: $size-small-square-rectangle-height;
  }
}

.big-square {
  width: $size-big-square-rectangle-height;
  height: $size-big-square-rectangle-height;

  button {
    height: $size-big-square-rectangle-height;
  }
}

.medium-rectangle {
  width: $size-medium-width;
  height: $size-medium-square-rectangle-height;

  button {
    height: $size-medium-square-rectangle-height;
  }
}

.medium-cover {
  width: $size-medium-width;
  height: calc(
    $size-medium-cover-height + $size-medium-square-rectangle-height
  );

  img {
    height: $size-medium-cover-height;
  }
  button {
    height: $size-medium-square-rectangle-height;
  }
}

.medium-square {
  width: $size-medium-square-rectangle-height;
  height: $size-medium-square-rectangle-height;

  button {
    height: $size-medium-square-rectangle-height;
  }
}

.small-rectangle {
  width: $size-small-width;
  height: $size-small-square-rectangle-height;

  button {
    height: $size-small-square-rectangle-height;
  }
}

.small-cover {
  width: $size-small-width;
  height: calc($size-small-cover-height + $size-small-square-rectangle-height);

  img {
    height: $size-small-cover-height;
  }
  button {
    height: $size-small-square-rectangle-height;
  }
}

.small-square {
  width: $size-small-square-rectangle-height;
  height: $size-small-square-rectangle-height;

  button {
    height: $size-small-square-rectangle-height;
  }
}
</style>
