import { compose } from 'ramda';

import { createSourceNodes, mediaNode } from './media.js';
import { MediaElement, MediaSource } from './types.js';
import { mountNode, toArray } from './utils.js';

export const audio = compose<
  [MediaSource[]],
  MediaSource[],
  MediaElement,
  HTMLMediaElement
>(
  mountNode<HTMLMediaElement>,
  createSourceNodes(mediaNode('audio')),
  toArray<MediaSource>
);
