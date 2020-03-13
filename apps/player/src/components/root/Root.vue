<template lang="pug">
  div.antialiased(:style="{ background, ...font }" data-test="root")
    slot
    font(v-for="(font, index) in fonts" :key="index" :src="font.src" :name="font.name" :weight="font.weight")
</template>

<script>
import { identity } from 'ramda'
import { mapState } from 'redux-vuex'
import Font from '@podlove/components/font'
import select from 'store/selectors'

export default {
  components: { Font },
  data: mapState({
    background: select.theme.brandLightest,
    font: select.theme.fontRegular,
    fonts: select.theme.fonts,
    language: select.language,
    state: state => ({
      title: select.episode.title(state),
      subtitle: select.episode.subtitle(state),
      summary: select.episode.summary(state),
      publicationDate: select.episode.publicationDate(state),
      poster: select.episode.poster(state),
      link: select.episode.link(state),
      duration: select.duration(state),
      playtime: select.playtime(state),
      show: {
        title: select.show.title(state),
        subtitle: select.show.subtitle(state),
        summary: select.show.summary(state),
        poster: select.show.poster(state),
        link: select.show.link(state)
      },
      playstate: select.playstate(state)
    })
  }),
  watch: {
    language() {
      this.$i18n.locale = this.language
    }
  },
  mounted() {
    this.$i18n.locale = this.language
  }
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.entry-enter-active,
.entry-leave-active {
  transition: height 300ms;

  * {
    transition: opacity 600ms;
  }
}
.entry-enter,
.entry-leave-to {
  height: 0;

  * {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 900ms;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
