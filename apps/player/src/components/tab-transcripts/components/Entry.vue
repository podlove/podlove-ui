<script>
const container = h => (children = []) =>
  h(
    'div',
    {
      class: {
        entry: true,
        'pb-6': true
      }
    },
    [...children]
  )

const chapter = (h, c) => (children = []) =>
  h(
    'div',
    {
      class: { 'text-lg': true },
      style: c.chapterStyle,
      on: c.prerender
        ? {}
        : {
            click: () => c.onClick(c.entry)
          }
    },
    [c.$t('TRANSCRIPTS.CHAPTER', c.entry), ...children]
  )

const speaker = (h, c) =>
  h('div', { class: {}, style: c.speakerStyle }, [
    c.entry.speaker.avatar
      ? h('img', {
          class: {
            'w-4': true,
            'h-4': true,
            'rounded-sm': true,
            'inline-block': true,
            'mr-2': true
          },
          domProps: { src: c.entry.speaker.avatar }
        })
      : null,
    c.entry.speaker.name
      ? h(
          'span',
          {
            class: { 'text-xs': true, uppercase: true, 'opacity-50': true },
            style: c.speakerTextStyle
          },
          c.entry.speaker.name
        )
      : null
  ])

const transcript = (h, c) => (children = []) =>
  h('span', { class: { transcript: true } }, [c.entry.speaker ? speaker(h, c) : null, ...children])

const highlightText = (h, c, text) => {
  if (!c.query) {
    return text
  }

  return text
    .replace(c.query, matched => `|||${matched}|||`)
    .split('|||')
    .map(text => (text.match(c.query) ? h('span', { style: c.highlightStyle }, text) : text))
}

const text = (h, c) => (transcript, index) =>
  h(
    'span',
    {
      class: {
        'opacity-75': c.playtime > transcript.end,
        'mr-1': index < c.entry.texts.length - 1,
        'active-transcript': c.activePlaytime(transcript)
      },
      style: c.prerender ? {} : c.transcriptStyle(transcript),
      on: c.prerender
        ? {}
        : {
            click: () => c.onClick(transcript),
            mouseover: () => c.onMouseOver(transcript),
            mouseleave: () => c.onMouseLeave(transcript)
          }
    },
    [highlightText(h, c, transcript.text)]
  )

export default {
  props: {
    prerender: {
      type: Boolean,
      default: false
    },
    entry: {
      type: Object,
      default: () => ({})
    },
    playtime: {
      type: Number,
      default: null
    },
    ghostActive: {
      type: Boolean
    },
    searchQuery: {
      type: String,
      default: ''
    },
    ghostTime: {
      type: Number,
      default: null
    },
    searchResults: {
      type: Array,
      default: () => []
    },
    chapterStyle: {
      type: Object,
      default: () => ({})
    },
    speakerStyle: {
      type: Object,
      default: () => ({})
    },
    highlightStyle: {
      type: Object,
      default: () => ({})
    },
    activeStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    query() {
      if (!this.searchQuery || this.searchResults.length === 0) {
        return null
      }

      return new RegExp(this.searchQuery, 'ig')
    }
  },
  methods: {
    // Event Bindings
    onClick(entry) {
      this.$emit('onClick', entry)
    },

    onMouseLeave(transcript) {
      this.$emit('onMouseLeave', transcript)
    },

    onMouseOver(transcript) {
      this.$emit('onMouseOver', transcript)
    },

    searchText(text) {
      return this.query
        ? text
            .toString()
            .replace(this.query, matchedText => `<span class="highlight">${matchedText}</span>`)
        : text
    },

    // Utilities
    activePlaytime(transcript) {
      if (transcript.start > this.playtime) {
        return false
      }

      if (transcript.end < this.playtime) {
        return false
      }

      return true
    },

    activeGhost(transcript) {
      if (!this.ghostTime) {
        return false
      }

      if (!this.ghostActive) {
        return false
      }

      if (transcript.start > this.ghostTime) {
        return false
      }

      if (transcript.end < this.ghostTime) {
        return false
      }

      return true
    },
    transcriptStyle(transcript) {
      if (this.prerender) {
        return {}
      }

      if (this.activePlaytime(transcript)) {
        return this.activeStyle
      }

      if (this.activeGhost(transcript)) {
        return this.activeStyle
      }

      return {}
    }
  },
  render(h) {
    const entryContainer = container(h, this)
    const entryChapter = chapter(h, this)
    const entryTranscript = transcript(h, this)
    const entryTexts = text(h, this)

    return entryContainer([
      this.entry.type === 'chapter'
        ? entryChapter()
        : entryTranscript(this.entry.texts.map(entryTexts))
    ])
  }
}
</script>
