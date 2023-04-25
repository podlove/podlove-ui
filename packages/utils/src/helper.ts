import { curry, map, compose, join, toUpper, juxt, head, tail, identity } from 'ramda';
import { isUndefinedOrNull } from './predicates';

/**
 * Collection of functional helpers
 */

export const inAnimationFrame =
  (func: Function) =>
  (...args: any[]): void => {
    window.requestAnimationFrame(() => func.apply(null, args));
  };

export const asyncAnimation =
  <T>(func: Function) =>
  (...args: any[]): Promise<T> =>
    new Promise((resolve) => {
      window.requestAnimationFrame(() => resolve(func.apply(null, args)));
    });

export const callWith =
  (...args: any[]) =>
  (func: Function) =>
    func.apply(null, args);

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
export const createObject = curry(
  <T>(specification: { [key: string]: Function }, value: any): T =>
    map((f: Function) => f(value), specification)
);
export const scope = curry(
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
export const startsWith = curry((q: string, str: string): boolean => str.startsWith(q));
export const endsWith = curry((q: string, str: string): boolean => str.endsWith(q));
export const stripl = curry((q: string, str: string): string =>
  startsWith(q, str) ? str.slice(q.length) : str
);
export const stripr = curry((q: string, str: string): string =>
  endsWith(q, str) ? str.slice(0, str.length - q.length) : str
);
export const strip = curry((q: string, str: string): string => stripl(q, stripr(q, str)));
