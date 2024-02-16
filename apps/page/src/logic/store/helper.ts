import { get } from 'lodash-es';

export const select =
  <T>(prop: string, fallback = {}): ((input: any) => T) =>
  (data: any) =>
    get(data, prop, fallback) as unknown as T;
