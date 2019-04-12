<template>
  <div>
    <ul>
      <li>{{ color }}</li>
      <li>{{ cover }}</li>
      <li>{{ podcastDescription }}</li>
      <li>{{ podcastFeed }}</li>
      <li>{{ podcastTitle }}</li>
      <li>{{ podcastSubTitle }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import {
  selectColor,
  selectCover,
  selectTitle,
  selectSubTitle,
  selectDescription,
  selectFeed
} from 'store/selectors'

export default {
  data: mapState({
    color: selectColor,
    cover: selectCover,
    podcastDescription: selectDescription,
    podcastFeed: selectFeed,
    podcastTitle: selectTitle,
    podcastSubTitle: selectSubTitle
  })
}
</script>
