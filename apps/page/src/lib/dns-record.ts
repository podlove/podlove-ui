import dns from 'node:dns';
import { get, noop } from 'lodash-es';
import type { APIContext } from 'astro';
import extractDomain from 'extract-domain';
import { safeParse } from './json';

type FeedData = { feed: string | null; primary_color: string | null };

const getDnsRecords = (hostname: string): Promise<string[]> =>
  new Promise((resolve, reject) => {
    dns.resolve(hostname, 'TXT', (err, records) => {
      if (err) {
        return reject(err);
      }

      return resolve(records[0]);
    });
  });

const getStore = (context: APIContext): KVNamespace =>
  get(context, ['locals', 'runtime', 'env', 'CUSTOM_DOMAINS'], {
    get: async () => null,
    put: noop
  } as unknown as KVNamespace);

export const extractDnsData = async (context: APIContext): Promise<FeedData> => {
  const domain = extractDomain(context.url.hostname);
  const entryName = `lux.${domain}`;
  const store = getStore(context);
  const fallback = { feed: null, primary_color: null };

  let result = await store.get(entryName);

  if (!result) {
    result = await getDnsRecords(entryName).then(
      ([result]) => result,
      () => null
    );
  }

  if (!result) {
    result = JSON.stringify(fallback);
  }

  store.put(entryName, result, { expirationTtl: 60 * 60 });

  return safeParse<FeedData>(result, fallback);
};
