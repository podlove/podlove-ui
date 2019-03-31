<template lang="pug">
  div.share-select-content#tab-share--content
    content-option#tab-share--content--show(
      v-if="showLink"
      tabindex="0"
      :content="$t('SHARE.CONTENT.SHOW')"
      :title="showTitle"
      type="show"
      :a11y="$t('A11Y.SHARE_CONTENT_SHOW', { title: showTitle })"
      :color="isActive('show') ? activeStyle.color : style.color",
      :background="isActive('show') ? activeStyle.background : style.background"
      @click="dispatch"
    )
      icon(slot="icon" type="content-show")

    content-option#tab-share--content--episode(
      tabindex="0"
      :content="$t('SHARE.CONTENT.EPISODE')"
      :title="episodeTitle"
      type="episode"
      :a11y="$t('A11Y.SHARE_CONTENT_EPISODE', { title: episodeTitle })"
      :color="isActive('episode') ? activeStyle.color : style.color",
      :background="isActive('episode') ? activeStyle.background : style.background"
      @click="dispatch"
    )
      icon(slot="icon" type="content-episode")

    content-option#tab-share--content--chapter(
      v-if="currentChapter"
      tabindex="0"
      :content="$t('SHARE.CONTENT.CHAPTER')"
      :title="currentChapter.title"
      type="chapter"
      :a11y="$t('A11Y.SHARE_CONTENT_CHAPTER', { title: currentChapter.title })"
      :color="isActive('chapter') ? activeStyle.color : style.color",
      :background="isActive('chapter') ? activeStyle.background : style.background"
      @click="dispatch"
    )
      icon(slot="icon" type="content-chapter")

    content-option#tab-share--content--time(
      tabindex="0"
      :content="$t('SHARE.CONTENT.TIME')"
      :title="toHumanTime(playtime)"
      type="time"
      :a11y="$t('A11Y.SHARE_CONTENT_PLAYTIME', { playtime: toHumanTime(playtime) })"
      :color="isActive('time') ? activeStyle.color : style.color",
      :background="isActive('time') ? activeStyle.background : style.background"
      @click="dispatch"
    )
      icon(slot="icon" type="content-chapter")
</template>

<script>
import { mapState } from 'redux-vuex'
import { toHumanTime } from '@podlove/utils/time'
import { Icon, ContentOption } from '@podlove/components'

import select from 'store/selectors'
import store from 'store'

export default {
  components: {
    Icon,
    ContentOption
  },
  data: mapState({
    activeStyle: select.styles.shareActiveContentStyle,
    style: select.styles.shareContentStyle,
    content: select.share.content,
    showTitle: select.show.title,
    showLink: select.show.link,
    episodeTitle: select.episode.title,
    currentChapter: select.chapters.current,
    playtime: select.playtime
  }),
  methods: {
    dispatch: store.dispatch,

    isActive(type) {
      return this.content === type
    },

    toHumanTime
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.share-select-content {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: $width-l) {
  .share-select-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
