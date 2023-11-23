import { compose, gt } from 'ramda';
import { luminosity } from 'farbraum';

export { luminosity };
export const isNegative = compose<any[], number, boolean>(
  gt(0.25) as (input: number) => boolean,
  luminosity
);
export const light = '#fff';
export const dark = '#000';
