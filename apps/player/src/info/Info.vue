<template lang="pug">
  div.info-tab#info-tab
    div.description
      div.episode
        h3.title#tab-info--episode-title(v-if="episodeTitle") {{ episodeTitle }}
        info-meta#tab-info--episode-meta
        p.subtitle#tab-info--episode-subtitle(v-if="episodeSubtitle") {{ episodeSubtitle }}
        info-summary#tab-info--episode-summary(v-if="episodeSummary" :content="episodeSummary")
        info-link#tab-info--episode-link(v-if="episodeLink" :link="episodeLink")

      div.show
        h3.title#tab-info--show-title(v-if="showTitle") {{ showTitle }}
        lazy-image.show-poster.shadowed#tab-info--show-poster(v-if="showPoster" :url="showPoster" :alt="$t('A11Y.ALT_SHOW_COVER')" :color="imageCover")
        info-summary#tab-info--show-summary(v-if="showSummary" :content="showSummary")
        info-link#tab-info--show-link(v-if="showLink" :link="showLink")

    info-contributors
</template>

<script>
import { mapState } from 'redux-vuex'
import { Icon } from '@podlove/components'
import { calcHours, calcMinutes, localeDate, localeTime } from '@podlove/utils/time'
import { Image as LazyImage } from '@podlove/components'

import select from 'store/selectors'

import InfoMeta from './components/Meta'
import InfoLink from './components/Link'
import InfoSummary from './components/Summary'
import InfoContributors from './components/Contributors'

export default {
  data: mapState({
    imageCover: select.styles.imageCover,
    episodeTitle: select.episode.title,
    episodeSubtitle: select.episode.subtitle,
    episodeSummary: select.episode.summary,
    episodeLink: select.episode.link,
    showTitle: select.show.title,
    showPoster: select.show.poster,
    showLink: select.show.link,
    showSummary: select.show.summary
  }),
  components: {
    InfoMeta,
    InfoLink,
    LazyImage,
    InfoSummary,
    InfoContributors
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.info-tab {
  padding: $padding;

  .description {
    display: flex;

    .episode {
      width: 60%;
      padding-right: $padding;
    }

    .show {
      width: 40%;
      padding-left: $padding;
    }

    .subtitle {
      font-weight: 500;
      hyphens: auto;
    }

    .show-poster {
      display: block;
      width: 100%;
      max-width: $info-cover-width;
      height: auto;
      margin-bottom: $margin;
    }
  }

  @media screen and (max-width: $width-m) {
    .description {
      display: block;

      .meta {
        flex-direction: column;
        align-items: left;
      }

      .episode,
      .show {
        width: 100%;
        padding: 0;
      }

      .show-poster {
        display: none;
      }
    }
  }
}
</style>
