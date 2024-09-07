import { flow, replace } from 'lodash-es';
import queryString from 'query-string';

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

export const hostname: (input: string) => string = flow(url, ({ hostname }) =>
  replace(hostname, /^(www\.)/, '')
);

export const pathname = flow(
  url,
  ({ pathname }) => pathname || '',
  (pathname: string) => (pathname.endsWith('/') ? pathname.slice(0, pathname.length - 1) : pathname)
);

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
