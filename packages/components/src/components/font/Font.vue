<script>
import { h } from 'vue'

export default {
  props: {
    name: {
      type: String,
      default: null
    },
    src: {
      type: Array,
      default: () => []
    },
    weight: {
      type: Number,
      default: null
    }
  },
  computed: {
    fontSrc() {
      const eot = this.src.find((font) => font.endsWith('.eot'))
      const woff = this.src.find((font) => font.endsWith('.woff'))
      const woff2 = this.src.find((font) => font.endsWith('.woff2'))
      const ttf = this.src.find((font) => font.endsWith('.ttf'))
      const svg = this.src.find((font) => font.endsWith('.svg'))

      return [
        { format: 'embedded-opentype', url: eot },
        { format: 'woff2', url: woff2 },
        { format: 'woff', url: woff },
        { format: 'truetype', url: ttf },
        { format: 'svg', url: svg }
      ]
        .filter(({ url }) => !!url)
        .map(({ format, url }) => `url("${url}") format("${format}")`)
        .join(',')
    }
  },
  render() {
    if (this.src.length === 0) {
      return ''
    }

    return h(
      'style',
      {},
      `
      @font-face {
        font-family: ${this.name};
        font-style: normal;
        font-display: swap;
        src: ${this.fontSrc};
        font-weight: ${this.weight};
      }
    `
    )
  }
}
</script>
