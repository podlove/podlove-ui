import { prop } from 'ramda'

export default {
  runtime: prop('runtime'),
  theme: prop('theme'),
  timepiece: prop('timepiece'),
  episode: prop('episode'),
  show: prop('show'),
  chapters: prop('chapters'),
  media: prop('media'),
  playstate: prop('playstate'),
  components: prop('components'),
  progress: prop('progress'),
  network: prop('network'),
  quantiles: prop('quantiles')
}
