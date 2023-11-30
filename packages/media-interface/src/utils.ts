import { compose, curry, prop } from 'ramda';
import { MediaElement, MediaSource } from './types.js';
import { F } from 'ts-toolbelt';

// Transformation utils
const collectProperties = curry(
  <T>(props: { [key: string]: Function }, val: MediaElement): T =>
    Object.keys(props).reduce(
      (result, name) =>
        Object.assign({}, result, {
          [name]: props[name](val)
        }),
      {}
    ) as T
);

const toArray = <T>(input: T | T[]): T[] =>
  Array.isArray(input) ? (input as T[]) : ([input] as T[]);

// Event Utils
const getNodeFromEvent = prop('target') as (input: any) => MediaElement;

// Dom Utils
const createNode = (tag: string) => document.createElement(tag);
const appendNode = curry((node: HTMLElement, childs: HTMLElement | HTMLElement[]): HTMLElement => {
  toArray(childs).forEach((child) => {
    node.appendChild(child);
  });

  return node;
});

const mountNode = <T>(child: any): T =>
  compose(() => child, appendNode(document.body))(child);

const setAttributes = curry((node: HTMLElement, attributes: { [key: string]: any }) =>
  Object.keys(attributes).reduce((result, key) => {
    result.setAttribute(key, attributes[key]);
    return result;
  }, node)
);

const getMediaSources = (media: MediaElement): MediaSource[] =>
  Array.from(media.children).map((node) => ({
    src: node.getAttribute('src') || '',
    type: node.getAttribute('type') || ''
  }));

const dispatchEvent: F.Curry<(type: string, node: HTMLElement) => HTMLElement> = curry((type: string, node: HTMLElement) => {
  const event = new Event(type);

  node.dispatchEvent(event);

  return node;
});

const browser = (() => {
  const test = (regexp: RegExp) => regexp.test(window.navigator.userAgent);

  switch (true) {
    case test(/edg/i):
      return 'edge';
    case test(/opr/i) && (!!(window as any).opr || !!(window as any).opera):
      return 'opera';
    case test(/chrome/i) && !!(window as any).chrome:
      return 'chrome';
    case test(/trident/i):
      return 'ie';
    case test(/firefox/i):
      return 'firefox';
    case test(/safari/i):
      return 'safari';
    default:
      return 'other';
  }
})();

const parseFloatInput = (input: string | number): number =>
  typeof input === 'string' ? parseFloat(input) : input;

export {
  parseFloatInput,
  collectProperties,
  getNodeFromEvent,
  createNode,
  mountNode,
  setAttributes,
  appendNode,
  getMediaSources,
  dispatchEvent,
  browser,
  toArray
};
