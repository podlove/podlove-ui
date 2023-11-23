<script lang="ts">
import { h } from 'vue'

export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  render() {
    return h('style', {}, this.content)
  }
}
</script>
