import { prop } from 'ramda';

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
  visibleComponents: prop('visibleComponents'),
  ghost: prop('ghost'),
  network: prop('network'),
  quantiles: prop('quantiles'),
  tabs: prop('tabs'),
  contributors: prop('contributors'),
  files: prop('files'),
  share: prop('share'),
  reference: prop('reference'),
  audio: prop('audio'),
  transcripts: prop('transcripts'),
  error: prop('error'),
  driver: prop('driver'),
  playlist: prop('playlist'),
  subscribeButton: prop('subscribeButton'),
  channels: prop('channels')
};
