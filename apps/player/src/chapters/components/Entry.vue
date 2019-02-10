<template lang="pug">
  div.chapters--entry(:class="{active: chapter.active}" :style="chapterStyle" @mouseover="mouseOverHandler" @mouseleave="mouseLeaveHandler")
    span.index(v-if="hover" @click="selectChapter()" aria-hidden="true")
      icon(type="link" :size="20" :color="iconColor" v-if="linkHover")
      icon(type="play" :size="12" :color="iconColor" v-else)

    span.index(aria-hidden="true" v-else) {{chapter.index}}

    chapter-progress.chapter-progress(
        :chapter="chapter"
        :showLink="linkHover"
        :playtime="playtime"
        :ghost="ghost"
        :progressColor="progressChapterColor"
        @chapter="dispatch"
        @play="dispatch"
        @ghost="dispatch"
        @simulate="dispatch"
        @playtime="dispatch"
        @hover="linkMouseover"
    )

    button.visually-hidden(@click="selectChapter") {{ $t('A11Y.CHAPTER_ENTRY', a11y) }}
</template>

<script>
  import { mapActions } from 'redux-vuex'
  import { setChapter } from '@podlove/actions/chapters'
  import { requestPlay } from '@podlove/actions/play'
  import { toHumanTime } from '@podlove/utils/time'

  import select from 'store/selectors'
  import store from 'store'

  import { ChapterProgress, Icon } from '@podlove/components'

  export default {
    props: ['chapter'],

    data () {
      return {
        ...this.mapState({
          playtime: select.playtime,
          iconColor: select.styles.chapterIcon,
          activeChapterStyle: select.styles.activeChapter,
          progressChapterColor: select.styles.progressChapterColor,
          ghost: select.ghost.time
        }),

        hover: false,
        linkHover: false,
      }
    },

    computed: {
      chapterStyle () {
        if (this.chapter.active || this.hover) {
          return this.activeChapterStyle
        }

        return {}
      },

      a11y () {
        const remaining = this.chapter.active ? this.chapter.end - this.playtime : this.chapter.end - this.chapter.start

        return {
          ...this.chapter,
          remaining: toHumanTime(remaining > 0 ? remaining : 0),
          duration: toHumanTime(this.chapter.end - this.chapter.start)
        }
      }
    },

    methods: {
      mouseOverHandler () {
        this.hover = true
      },

      mouseLeaveHandler () {
        this.hover = false
      },

      linkMouseover (state) {
        this.linkHover = state
      },

      ...mapActions({
        selectChapter: function ({ dispatch }, event) {
          if (this.linkHover) {
            return false
          }

          dispatch(setChapter(this.chapter.index - 1))
          dispatch(requestPlay())
          event.preventDefault()
          return false
        }

      }),
      dispatch: store.dispatch
    },
    components: {
      Icon,
      ChapterProgress
    }
  }
</script>

<style lang="scss" scoped>
  @import '~styles/variables';
  @import '~styles/font';

  .chapters--entry {
    width: 100%;
    position: relative;
    font-weight: 300;
    display: flex;
    cursor: pointer;

    transition: background $animation-duration, color $animation-duration;

    .chapter-progress {
      width: calc(100% - #{$index-width});
    }

    .index {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: $index-width;
    }

    &.active {
      font-weight: 500;
    }
  }
</style>
