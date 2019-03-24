<template>
  <div :style="`background: ${color}`">
    <div>cover</div>
    <button>Subscribe</button>
    <div>{{color}}</div>
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
