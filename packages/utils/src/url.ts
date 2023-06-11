import { compose, propOr, replace } from 'ramda';
import queryString from 'query-string';
import { stripr } from './helper';

const url = (href: string): URL => {
  try {
    return new URL(href);
  } catch (e) {
    return {
      host: null,
      href: null,
      origin: null,
      pathname: null
    } as URL;
  }
};

export const hostname = compose<any[], URL, string, string>(
  replace(/^(www\.)/, ''),
  propOr('', 'hostname'),
  url
);
export const pathname = compose<any[], URL, string, string>(stripr('/'), propOr('', 'pathname'), url);

export const addQueryParameter = (
  url: string,
  additionalParameters: { [key: string]: string | boolean } = {}
) => {
  const parser = document.createElement('a');
  parser.href = url;

  const existingParameters = queryString.parse(parser.search);
  parser.search = queryString.stringify(
    Object.assign({}, existingParameters, additionalParameters)
  );
  return parser.href;
};

export const queryParameter = queryString.stringify;
