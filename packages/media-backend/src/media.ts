import { compose, curry } from 'ramda';

import { appendNode, setAttributes, createNode } from './utils.js';
import { mediaPolyfill } from './polyfills.js';
import { MediaElement, MediaSource } from './types.js';
import { F } from 'ts-toolbelt';

const createSource = (source: MediaSource): MediaElement => {
  const node = createNode('source');
  return setAttributes(node, source);
};

const createSourceNodes: F.Curry<(node: MediaElement, sources: MediaSource[]) => MediaElement> = curry((node: MediaElement, sources: MediaSource[]): MediaElement => {
  const sourceNodes = sources.map(createSource);
  return appendNode(node, sourceNodes);
});

const mediaNode = compose<[string], any, MediaElement>(mediaPolyfill, createNode);

export { createSourceNodes, mediaNode };
