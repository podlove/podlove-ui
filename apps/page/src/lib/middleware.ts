import { get } from 'lodash-es';

export const getRequestHeader = (request: Request, header: string, fallback: string) =>
  get((request.headers.get(header) || '').split(','), 0, fallback);
