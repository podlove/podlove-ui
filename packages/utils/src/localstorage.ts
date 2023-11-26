const STORE: Storage = window.localStorage;

const selector = (scope: string) => (key: string): string => [scope, key].join('\x00');
const notFound = (selector: string): Error & { notFound: boolean; key: string } => {
  const error = new Error(`Not Found [${selector}]`);

  return {
    ...error,
    notFound: true,
    key: selector
  };
};

export default (
  scope: string
): {
  get: <T>(key: string) => [Error | null, T | null];
  selector: (key: string) => string;
  put: <T>(key: string, value: T) => [Error | null, string | null];
} => ({
  selector: selector(scope),

  get<T>(key: string): [Error | null, T | null] {
    const selector = this.selector(key);

    if (!STORE[selector]) {
      return [notFound(selector), null];
    }

    try {
      return [null, JSON.parse(STORE[selector])];
    } catch (err) {
      return [err, null];
    }
  },

  put<T>(key: string, value: T): [Error | null, string | null] {
    if (typeof value === 'undefined') {
      return [new Error(`Invalid parameters to put, ('${key}', undefined)`), null];
    }

    try {
      const selector = this.selector(key);

      return [null, (STORE[selector] = JSON.stringify(value))];
    } catch (err) {
      return [err, null];
    }
  }
});
