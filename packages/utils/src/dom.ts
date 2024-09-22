import { curry, flowRight as compose, uniq, join, filter, head } from 'lodash-es';
import DOMPurify from 'dompurify';

export const findNode = (selector: string | HTMLElement): HTMLElement => {
  if (typeof selector === 'string') {
    return head(Array.from(document.querySelectorAll(selector))) as HTMLElement;
  }

  return selector;
};

export const createNode = (tag: string): HTMLElement => document.createElement(tag);
export const appendNode: any = curry((node: HTMLElement, child: HTMLElement): HTMLElement => {
  node.appendChild(child);

  return child;
});

export const tag: any = curry(
  (tag: string, value: string = '', attributes: { [key: string]: string }): string => {
    const attr = Object.entries(attributes || {})
      .map(([attribute, value]) => ` ${attribute}="${value}"`)
      .join('');

    return `<${tag}${attr}>${value}</${tag}>`;
  }
);

export const setStyles: any = curry((attrs: { [key: string]: string }, el: HTMLElement): HTMLElement => {
  Object.entries(attrs).forEach(([property, value]) => {
    el.style[property] = value;
  });

  return el;
});

export const removeStyles: any = curry((attrs: string[], el: HTMLElement): void => {
  (attrs || []).forEach((attr) => {
    el.style.removeProperty(attr);
  });
});

export const getClasses = compose<any[], string[], string[]>(
  filter((input: string) => !!input),
  (el) => el.className.split(' ')
);

export const hasOverflow = (el: HTMLElement): boolean => el.scrollWidth > el.clientWidth;

export const addClasses: any = curry((classes: string[] = [], el: HTMLElement): HTMLElement => {
  const existingClasses = uniq(getClasses(el).concat(classes)).join(' ');

  el.className = existingClasses;

  return el;
});

export const removeClasses: any = curry((classes: string[] = [], el: HTMLElement): HTMLElement => {
  el.className = compose<any[], string[], string[], string>(
    join(' '),
    filter((className: string) => !~classes.indexOf(className)),
    getClasses
  )(el);

  return el;
});

export const sanitize = (input: string): string => {
  if (!input || typeof window === 'undefined') {
    return input;
  }

  const purify = DOMPurify(window);

  // Adds target="_blank" to parsed links
  purify.addHook('afterSanitizeElements', (node) => {
    if (node.tagName === 'A') {
      node.setAttribute('target', '_blank');
    }

    return node;
  });

  return purify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'ul', 'li', 'ol', 'br'],
    ALLOWED_ATTR: ['href', 'target']
  });
};

export const setAttributes: any = curry(
  (attrs: { [key: string]: string }, el: HTMLElement): HTMLElement => {
    Object.entries(attrs).forEach(([property, value]) => {
      el.setAttribute(property, value);
    });

    return el;
  }
);

export const resizeObserver: any = curry((element: HTMLElement, cb: () => void) => {
  const observer = new MutationObserver(cb);

  observer.observe(element, { childList: true });
  window.addEventListener('resize', cb);
});
