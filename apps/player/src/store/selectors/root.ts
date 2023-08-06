import { prop, path } from 'ramda';
import { State as ContentState } from '@podlove/player-state/content';
import { State as EmbedState } from '@podlove/player-state/embed';
import State from '../state.js';

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
  share: {
    content: path<State, ContentState>(['share', 'content']),
    embed: path<State, EmbedState>(['share', 'embed']),
  },
  reference: prop('reference'),
  audio: prop('audio'),
  transcripts: prop('transcripts'),
  error: prop('error'),
  driver: prop('driver'),
  playlist: prop('playlist'),
  subscribeButton: prop('subscribeButton'),
  channels: prop('channels')
};
