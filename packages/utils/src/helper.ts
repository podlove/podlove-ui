import { curry, map, compose, identity } from 'ramda';
import { isUndefinedOrNull } from './predicates.js';

/**
 * Collection of functional helpers
 */

export const inAnimationFrame =
  (func: Function) =>
  (...args: any[]): void => {
    window.requestAnimationFrame(() => func(...args));
  };

export const asyncAnimation = (): Promise<void> =>
  new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });

export const callWith =
  (...args: any[]) =>
  (func: Function) =>
    func(...args);

// Math helpers
export const toInt = (input: string | number = 0): number =>
  isNaN(parseInt(input.toString(), 10)) ? 0 : parseInt(input.toString(), 10);
export const toFloat = (input: string | number = 0): number =>
  isNaN(parseFloat(input.toString())) ? 0 : parseFloat(input.toString());

// Functional Helper
export const fallbackTo =
  <T>(fallback: T) =>
  (value: T) =>
    isUndefinedOrNull(value) ? fallback : value;
export const createObject: any = curry(
  <T>(specification: { [key: string]: Function }, value: any): T =>
    map((f: Function) => f(value), specification)
);
export const scope: any = curry(
  (
    selectors: { [key: string]: Function } = {},
    context: Function = identity
  ): { [key: string]: any } =>
    Object.keys(selectors).reduce(
      (result, key) => ({
        ...result,
        [key]: compose(selectors[key] as any, context as any)
      }),
      {}
    )
);
export const startsWith: any = curry((q: string, str: string): boolean => str.startsWith(q));
export const endsWith: any = curry((q: string, str: string): boolean => str.endsWith(q));
export const stripl: any = curry((q: string, str: string): string =>
  startsWith(q, str) ? str.slice(q.length) : str
);
export const stripr: any = curry((q: string, str: string): string =>
  endsWith(q, str) ? str.slice(0, str.length - q.length) : str
);
export const strip: any = curry((q: string, str: string): string => stripl(q, stripr(q, str)));
