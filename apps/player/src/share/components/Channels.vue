<template lang="pug">
  ul.channel-list#tab-share-channels
    li#tab-share--channels--twitter
      channel(type="twitter" :text="shareText")
    li#tab-share--channels--facebook
      channel(type="facebook" :link="shareLink")
    li#tab-share--channels--pinterest
      channel(type="pinterest" :text="shareText" :link="shareLink" :poster="sharePoster")
    li#tab-share--channels--reddit
      channel(type="reddit" :text="shareText" :link="shareLink")
    li#tab-share--channels--mail
      channel(type="mail" :text="shareText" :subject="shareSubject")
    li#tab-share--channels--linkedin
      channel(type="linkedin" :text="shareText" :link="shareLink")
</template>

<script>
  import { mapState } from 'redux-vuex'
  import { toHumanTime } from '@podlove/utils/time'
  import { addQueryParameter } from '@podlove/utils/url'
  import { Channel } from '@podlove/components'

  import select from 'store/selectors'
  import store from 'store'

  export default {
    data: mapState({
      content: select.share.content,
      showLink: select.show.link,
      showTitle: select.show.title,
      showPoster: select.show.poster,
      episodeLink: select.episode.link,
      episodeTitle: select.episode.title,
      episodePoster: select.episode.poster,
      playtime: select.playtime,
      currentChapter: select.chapters.current,
    }),
    computed: {
      shareLink () {
        let time

        if (this.content === 'show') {
          return this.showLink
        }

        if (this.content === 'episode') {
          return this.episodeLink
        }

        if (this.content === 'chapter') {
          const { start, end } = this.currentChapter
          time = `${toHumanTime(start)},${toHumanTime(end)}`
        }

        if (this.content === 'time') {
          time = toHumanTime(this.playtime)
        }

        return addQueryParameter(this.episodeLink, { t: time })
      },

      shareText () {
        if (this.content === 'show') {
          return this.$t('SHARE.SHOW.TEXT', {
            title: this.showTitle,
            link: this.shareLink
          })
        }

        if (this.content === 'chapter') {
          return this.$t('SHARE.EPISODE.TEXT.CHAPTER', {
            title: this.episodeTitle,
            link: this.shareLink,
            chapter: this.currentChapter.title
          })
        }

        if (this.content === 'time') {
          return this.$t('SHARE.EPISODE.TEXT.PLAYTIME', {
            title: this.episodeTitle,
            link: this.shareLink,
            playtime: toHumanTime(this.playtime)
          })
        }

        return this.$t('SHARE.EPISODE.TEXT.BEGINNING', {
          title: this.episodeTitle,
          link: this.shareLink
        })
      },

      shareSubject () {
        if (this.content === 'show') {
          return this.$t('SHARE.SHOW.SUBJECT', {
            title: this.showTitle,
            link: this.shareLink
          })
        }

        if (this.content === 'chapter') {
          return this.$t('SHARE.EPISODE.SUBJECT.CHAPTER', {
            title: this.episodeTitle,
            link: this.shareLink,
            chapter: this.currentChapter.title
          })
        }

        if (this.content === 'time') {
          return this.$t('SHARE.EPISODE.SUBJECT.PLAYTIME', {
            title: this.episodeTitle,
            playtime: toHumanTime(this.playtime)
          })
        }

        return this.$t('SHARE.EPISODE.SUBJECT.BEGINNING', {
          title: this.episodeTitle,
        })
      },

      sharePoster () {
        if (this.content === 'show') {
          return this.showPoster
        }

        return this.episodePoster
      }
    },
    methods: {
      dispatch: store.dispatch
    },
    components: {
      Channel
    }
  }
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .channel-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    margin: 0 0 $margin /2 0;
    padding: 0;
  }
</style>
