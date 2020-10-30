<template lang="pug">
  span(:style="style" data-test="publication-date") {{ date }}
</template>

<script>
import { format } from 'date-fns'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  props: {
    format: {
      type: String,
      default: null
    }
  },
  data: mapState({
    color: select.theme.contrast,
    publicationDate: select.episode.publicationDate
  }),
  computed: {
    style() {
      return {
        color: this.color
      }
    },
    date() {
      const date = new Date(this.publicationDate)

      return this.format ? format(date, this.format) : date.toLocaleDateString()
    }
  }
}
</script>
