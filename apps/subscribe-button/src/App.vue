<template>
  <div class="background">
    <div v-if="!overlayVisible" :class="dimensions">
      <cover v-if="format === 'cover'" alt="ccc" :url="cover" :cover-color="color" />
      <button-component :sb="true" @click="showOverlay"></button-component>
    </div>
    <transition name="fade">
      <overlay-component v-if="overlayVisible"></overlay-component>
    </transition>
  </div>
</template>
<script>
import { compose } from 'ramda'
import ButtonComponent from './button/button'
import OverlayComponent from './overlay/overlay'
// import { getPlattform } from '@podlove/utils/useragent'
import { Image } from '@podlove/components'
import { mapState } from 'redux-vuex'
import store from 'store'

import {
  selectColor,
  selectCover,
  selectFormat,
  selectSize,
  selectStyle,
  selectOverlayVisible
} from 'store/selectors'

import { showOverlay } from 'store/actions'

export default {
  components: { Cover: Image, ButtonComponent, OverlayComponent },
  data: mapState({
    color: selectColor,
    cover: selectCover,
    format: selectFormat,
    size: selectSize,
    style: selectStyle,
    overlayVisible: selectOverlayVisible
  }),
  computed: {
    dimensions() {
      return `${this.size.toLowerCase()}-${this.format.toLowerCase()}`
    }
  },
  methods: {
    showOverlay: compose(
      store.dispatch,
      showOverlay
    )
  }
}
</script>

<style lang="scss">
@import '~normalize-scss';
@import '~theme/font';
@import '~theme/reset';
@import '~theme/variable';
@import '~theme/animations';

.background {
  @include font();
  font-size: 16px;
  display: inline-block;
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
</style>
