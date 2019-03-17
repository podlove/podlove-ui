<template lang="pug">
  p.info-meta
    span.info-tag(v-if="date")
      icon(type="calendar")
      span {{ date }}, {{ time }}
    span.info-tag(v-if="duration && episodeDuration.hours > 0")
      icon(type="clock")
      span {{ $t('INFO.DURATION_WITH_HOURS', episodeDuration) }}
    span.info-tag(v-if="duration && episodeDuration.hours === 0")
      icon(type="clock")
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

.info-meta {
  display: flex;
  align-items: center;

  .info-tag {
    display: flex;
    align-items: center;
    margin-right: $margin;
  }
}

@media screen and (max-width: $width-m) {
  .info-meta {
    flex-direction: column;
    align-items: left;
  }
}
</style>
