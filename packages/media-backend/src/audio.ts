import { createSourceNodes, mediaNode } from './media.js';
import { MediaSource } from './types.js';
import { toArray } from './utils.js';

export const audio =
  (mediaSources: MediaSource[], mountPoint?: HTMLElement) => {
    const sources = toArray(mediaSources);
    const audioNode = createSourceNodes(mediaNode('audio'), sources);
    (mountPoint || document.body).appendChild(audioNode);

    return audioNode;
  }
