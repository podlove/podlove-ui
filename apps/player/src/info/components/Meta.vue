<template lang="pug">
  p.info-meta
    span.info-tag(v-if="date")
      icon.info-icon(type="calendar")
      span.info-date {{ date }}, {{ time }}
    span.info-tag(v-if="duration && episodeDuration.hours > 0")
      icon.info-icon(type="clock")
      span.info-date {{ $t('INFO.DURATION_WITH_HOURS', episodeDuration) }}
    span.info-tag(v-if="duration && episodeDuration.hours === 0")
      icon.info-icon(type="clock")
      span.info-date {{ $t('INFO.DURATION', episodeDuration) }}
</template>

<script>
import { mapState } from 'redux-vuex'
import { localeDate, localeTime, calcHours, calcMinutes } from '@podlove/utils/time'
import { Icon } from '@podlove/components'
import select from 'store/selectors'

export default {
  components: {
    Icon
  },

  data: mapState({
    duration: select.duration,
    publicationDate: select.episode.publicationDate,
    locale: select.locale
  }),

  computed: {
    episodeDuration() {
      return {
        hours: calcHours(this.duration),
        minutes: calcMinutes(this.duration)
      }
    },
    date() {
      return this.publicationDate && localeDate(this.publicationDate, this.locale)
    },
    time() {
      return this.publicationDate && localeTime(this.publicationDate, this.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.info-meta {
  width: 100%;
  display: flex;
  align-items: center;

  .info-tag {
    display: inline-flex;
    align-items: center;
    margin-right: $margin;
  }

  .info-date {
    white-space: nowrap;
  }

  .info-icon {
    margin-right: $margin / 2;
  }
}

@media screen and (max-width: $width-l) {
  .info-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
