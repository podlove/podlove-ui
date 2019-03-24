<template>
  <div>
    Hello.
    <button>Subscribe</button>
    {{style}}
  </div>
</template>

<script>
import { mapState } from "redux-vuex";
import {
  selectColor,
  selectFormat,
  selectSize,
  selectStyle
} from "store/selectors";
export default {
  data: mapState({
    color: selectColor,
    format: selectFormat,
    size: selectSize,
    style: selectStyle
  })
};
</script>

<style>
</style>
