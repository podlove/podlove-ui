import { curry } from 'ramda';
import { toFloat, toInt } from './helper.js';

export const toPercent = (input: string | number): number => {
  input = toFloat(input || 0) * 100;
  return Math.round(input);
};

export const round = (input: number = 0): number => Math.ceil(input * 100) / 100;

export const interpolate = (num: number = 0): number => Math.round(num * 100) / 100;

export const roundUp = (base: number, number: number): number => {
  number = Math.ceil(number * 100);

  if (number % base === 0) {
    return (number + base) / 100;
  }

  return (number + (base - (number % base))) / 100;
};

export const relativePosition = (current: number = 0, maximum: number = 0): string =>
  current < maximum ? (current * 100) / maximum + '%' : '100%';

export const inRange: any = curry(
  (lower: number, upper: number, value: number): number => {
    if (value < lower) {
      return lower;
    }

    if (value > upper) {
      return upper;
    }

    return value;
  }
);

export const toDecimal = (input: number = 0): string => (Math.round(input * 100) / 100).toFixed(2);

export const toMegabyte = (size: number = 0): number => toInt(toInt(size) / 1000000);
