import { get } from 'lodash-es';
import State from '../state.js';

const slice = (slice: string) => (state: State) => get(state, slice);

export default {
  runtime: slice('runtime'),
  theme: slice('theme'),
  timepiece: slice('timepiece'),
  episode: slice('episode'),
  show: slice('show'),
  chapters: slice('chapters'),
  media: slice('media'),
  playstate: slice('playstate'),
  components: slice('components'),
  visibleComponents: slice('visibleComponents'),
  ghost: slice('ghost'),
  network: slice('network'),
  quantiles: slice('quantiles'),
  tabs: slice('tabs'),
  contributors: slice('contributors'),
  files: slice('files'),
  share: {
    content: (state) => get(state, ['share', 'content']),
    embed: (state) => get(state, ['share', 'embed'])
  },
  reference: slice('reference'),
  audio: slice('audio'),
  transcripts: slice('transcripts'),
  error: slice('error'),
  driver: slice('driver'),
  playlist: slice('playlist'),
  subscribeButton: slice('subscribeButton'),
  channels: slice('channels')
};
