<template lang="pug">
  p.meta
    span.tag(v-if="date")
      icon.icon(type="calendar")
      span {{ date }}, {{ time }}
    span.tag(v-if="duration && episodeDuration.hours > 0")
      icon.icon(type="clock")
      span {{ $t('INFO.DURATION_WITH_HOURS', episodeDuration) }}
    span.tag(v-if="duration && episodeDuration.hours === 0")
      icon.icon(type="clock")
      span {{ $t('INFO.DURATION', episodeDuration) }}
</template>

<script>
import { mapState } from 'redux-vuex'
import { localeDate, localeTime, calcHours, calcMinutes } from '@podlove/utils/time'
import { Icon } from '@podlove/components'
import select from 'store/selectors'


export default {
  data: mapState({
    duration: select.duration,
    publicationDate: select.episode.publicationDate,
    locale: select.locale
  }),

  computed: {
    episodeDuration () {
      return {
        hours: calcHours(this.duration),
        minutes: calcMinutes(this.duration)
      }
    },
    date () {
      return this.publicationDate && localeDate(this.publicationDate, this.locale)
    },
    time () {
      return this.publicationDate && localeTime(this.publicationDate, this.locale)
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .meta {
    display: flex;
    align-items: center;

    .tag {
      display: flex;
      align-items: center;
      margin-right: $margin
    }
  }

  @media screen and (max-width: $width-m) {
    .meta {
      flex-direction: column;
      align-items: left;
    }
  }
</style>
