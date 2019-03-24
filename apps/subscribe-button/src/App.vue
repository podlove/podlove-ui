<template>
  <div>
    Hello.
    <button>Subscribe</button>
    {{style}}
  </div>
</template>

<script>
import { mapState } from "redux-vuex";
import { selectStyle } from "store/selectors";
export default {
  data: mapState({ style: selectStyle })
};
</script>

<style>
</style>
