import { luminosity } from 'farbraum';

export { luminosity };
export const isNegative = (input: string) => luminosity(input) < 0.25

export const light = '#fff';
export const dark = '#000';
