import { identity, flow, isNil } from 'lodash-es';

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
    isNil(value) ? fallback : value;

export const createObject =
  <T>(specification: { [key: string]: Function }) =>
  (value: any): T =>
    Object.entries(specification).reduce(
      (result, [key, f]) => ({
        ...result,
        [key]: f(value)
      }),
      {} as T
    );

export const scope =
  <T>(selectors: { [key: string]: Function } = {}) =>
  (context: Function = identity): T =>
    Object.keys(selectors).reduce(
      (result, key) => ({
        ...result,
        [key]: flow(context as any, selectors[key] as any)
      }),
      {} as T
    );
