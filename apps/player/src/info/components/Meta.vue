<template lang="pug">
  p.meta
    span.tag(v-if="date")
      icon.icon(type="calendar")
      {{ publicationDate }}, {{ publicationTime }}
    span.tag(v-if="duration && episodeDuration.hours > 0")
      icon.icon(type="clock")
      {{ $t('INFO.DURATION_WITH_HOURS', episodeDuration) }}
    span.tag(v-if="duration && episodeDuration.hours === 0")
      icon.icon(type="clock")
      {{ $t('INFO.DURATION', episodeDuration) }}
</template>

<script>
import { mapState } from 'redux-vuex'
import { localeDate, localeTime, calcHours, calcMinutes } from '@podlove/utils/time'
import select from 'store/selectors'

export default {
  data: mapState({
    duration: select.duration,
    publicationDate: select.episode.publicationDate,
    locale: select.runtime.locale
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
