import { isNil, curry } from 'ramda';

export const or: any = curry(
  <T>(p1: (input: T) => boolean, p2: (input: T) => boolean, x: T): boolean => p1(x) || p2(x)
);
export const and: any = curry(
  <T>(p1: (input: T) => boolean, p2: (input: T) => boolean, x: T): boolean => p1(x) && p2(x)
);
export const not: any = curry(<T>(p: (input: T) => boolean, x: T): boolean => !p(x));
export const isUndefined = (x: any): boolean => x === undefined;

export const isUndefinedOrNull = or(isUndefined, isNil) as (input: any) => boolean;
export const isDefinedAndNotNull = not(isUndefinedOrNull) as (input: any) => boolean;
