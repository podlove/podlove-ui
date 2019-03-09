<script>
  import { mapState } from 'redux-vuex'

  const container = (h, c) => (children = []) =>
    h('div', {
      class: {
        entry: true,
        chapter: c.entry.type === 'chapter',
        transcript: c.entry.type === 'transcript',
        speaker: c.entry.speaker
      }
    }, [...children])

  const chapter = (h, c) => (children = []) =>
    h('span', {
      class: { chapter: true },
      style: c.prerender ? {} : c.chapterStyle,
      on: c.prerender ? {} : {
        click: () => c.onClick(c.entry)
      }
    }, [c.$t('TRANSCRIPTS.CHAPTER', c.entry), ...children])

  const speaker = (h, c) =>
    h('span', { class: { speaker: true } }, [
      h('span', { class: { 'speaker-background': true }, style: c.speakerBackgroundStyle }),
      c.entry.speaker.avatar ? h('img', { class: { 'speaker-avatar': true }, domProps: { src: c.entry.speaker.avatar } }) : null,
      c.entry.speaker.name ? h('span', { class: { 'speaker-name': true }, style: c.prerender ? {} : c.speakerTextStyle }, c.entry.speaker.name) : null
    ])

  const transcript = (h, c) => (children = []) =>
    h('span', { class: { 'transcript': true } }, [
      c.entry.speaker ? speaker(h, c) : null,
      ...children
    ])

  const highlightText = (h, c, text) => {
    if (!c.query) {
      return text
    }

    return text
      .replace(c.query, matched => `|||${matched}|||`)
      .split('|||')
      .map(text =>
        text.match(c.query) ? h('span', { class: { highlight: true } }, text) : text)
  }

  const text = (h, c) => (transcript, index) =>
    h('span', {
      class: {
        text: true,
        last: index === (c.entry.texts.length - 1),
        active: c.activePlaytime(transcript),
        inactive: c.playtime > transcript.end
      },
      style: c.prerender ? {} : c.transcriptStyle(transcript),
      on: c.prerender ? {} : {
        click: () => c.onClick(transcript),
        mouseover: () => c.onMouseOver(transcript),
        mouseleave: () => c.onMouseLeave(transcript)
      }
    }, [highlightText(h, c, transcript.text)])

  export default {
    props: {
      prerender: {
        type: Boolean,
        default: false
      },
      entry: {
        type: Object
      },
      playtime: {
        type: Number
      },
      ghostActive: {
        type: Boolean
      },
      searchQuery: {
        type: String,
        default: ''
      },
      ghostTime: {
        type: Number
      },
      searchResults: {
        type: Array,
        default: []
      },
      chapterStyle: {
        type: Object,
        default: () => ({})
      },
      ghostStyle: {
        type: Object,
        default: () => ({})
      },
      activeStyle: {
        type: Object,
        default: () => ({})
      }
    },
    render (h) {
      const entryContainer = container(h, this)
      const entryChapter = chapter(h, this)
      const entryTranscript = transcript(h, this)
      const entryTexts = text(h, this)

      return entryContainer([
        this.entry.type === 'chapter' ? entryChapter() : entryTranscript(this.entry.texts.map(entryTexts))
      ])
    },
    computed: {
      speakerBackgroundStyle () {
        return {
          background: this.chapterStyle.background
        }
      },
      speakerTextStyle () {
        return {
          color: this.chapterStyle.color
        }
      },
      query () {
        if (!this.searchQuery || this.searchResults.length === 0) {
          return null
        }

        return new RegExp(this.searchQuery, 'ig')
      }
    },
    methods: {
      // Event Bindings
      onClick (entry) {
        this.$emit('onClick', entry)
      },

      onMouseLeave (transcript) {
        this.$emit('onMouseLeave', transcript)
      },

      onMouseOver (transcript) {
        this.$emit('onMouseOver', transcript)
      },

      searchText (text) {
        return this.query ? text.toString().replace(this.query, matchedText => `<span class="highlight">${matchedText}</span>`) : text
      },

      // Utilities
      activePlaytime (transcript) {
        if (transcript.start > this.playtime) {
          return false
        }

        if (transcript.end < this.playtime) {
          return false
        }

        return true
      },

      activeGhost (transcript) {
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

      transcriptStyle (transcript) {
        if (this.prerender) {
          return {}
        }

        if (this.activePlaytime(transcript)) {
          return this.activeStyle;
        }

        if (this.activeGhost(transcript)) {
          return this.ghostStyle;
        }

        return {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .entry {
    cursor: pointer;
    padding: 0.25em 1.25em;

    &.speaker {
      padding: 0.25em 1.5em 0.25em 3.5em;
    }

    &.chapter {
      padding: 0.25em 0;
    }

    .transcript {
      display: block;
      line-height: 1.5em;
    }

    &:first-child {
      padding-top: 0;
    }

    .chapter {
      display: block;
      font-style: italic;
      width: 100%;
      padding: 0.25em 0;
      text-align: center;
    }

    .speaker {
      display: inline-block;
      position: relative;
      margin-left: -2.25em;
      margin-right: 0.4em;

      .speaker-background {
        position: absolute;
        left: 0;
        transform: translateY(0.4em);
        width: calc(100% + 0.5em);
        height: 1.5em;
        border-radius: 0.75em;
      }

      .speaker-name {
        position: relative;
        font-weight: 500;
      }

      .speaker-avatar {
        height: 1.5em;
        width: auto;
        border-radius: 0.75em;
        transform: translateY(0.4em);
        margin-right: 0.25em;
      }
    }

    .text {
      border-radius: 4px;
      padding: 0.1em;
      margin: 0 0.1em 0 0;
      line-height: 0;
      border: 1px solid transparent;
      hyphens: auto;

      &.inactive {
        opacity: 0.75;
      }

      &.last {
        margin-right: 0;
      }
    }

    .highlight {
      background-color: $search-highlight-color;
    }
  }
</style>
