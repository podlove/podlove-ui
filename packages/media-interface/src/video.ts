import { compose } from 'ramda';

import { createSourceNodes, mediaNode } from './media.js';
import { MediaElement, MediaSource } from './types.js';
import { mountNode, toArray } from './utils.js';

export const video = compose(mountNode, createSourceNodes(mediaNode('video')), toArray<MediaSource>) as (
  sources: MediaSource[] | MediaSource
) => MediaElement;
