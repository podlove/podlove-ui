import { compose } from 'ramda';
import queryString, { ParsedQuery } from 'query-string';
import { toPlayerTime } from './time.js';

export interface LocationParameters {
  starttime?: number | undefined;
  stoptime?: number | undefined;
  episode?: string;
  config?: string;
  autoplay?: boolean;
}

export const locationParams = (): ParsedQuery => queryString.parse(window.location.search);

const parseParameters = (parameters: {
  t?: string;
  episode?: string;
  config: string;
  autoplay: string;
}) => {
  const parsed: LocationParameters = {};

  if (parameters.t) {
    const [start, stop] = parameters.t.split(',');
    parsed.starttime = toPlayerTime(start) || undefined;
    parsed.stoptime = toPlayerTime(stop) || undefined;
  }

  if (parameters.episode) {
    parsed.episode = parameters.episode;
  }

  if (parameters.config) {
    parsed.config = parameters.config;
  }

  if (parameters.autoplay) {
    parsed.autoplay = true;
  }

  return parsed;
};

export const urlParameters = compose<any[], ParsedQuery, LocationParameters>(
  parseParameters,
  locationParams
);
