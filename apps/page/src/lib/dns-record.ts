import { get, noop } from 'lodash-es';
import type { APIContext } from 'astro';
import { getDomain } from 'tldts';
import { safeParse } from './json';

type FeedData = { feed: string | null; primary_color: string | null };
type DnsAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

const getDnsRecords = async (hostname: string): Promise<DnsAnswer[]> =>
  fetch(`https://cloudflare-dns.com/dns-query?name=${hostname}&type=TXT`, {
    headers: {
      Accept: 'application/dns-json'
    }
  })
    .then((res) => res.json())
    .then((result) => get(result, ['Answer'], []));

const getStore = (context: APIContext): KVNamespace =>
  get(context, ['locals', 'runtime', 'env', 'CUSTOM_DOMAINS'], {
    get: async () => null,
    put: noop
  } as unknown as KVNamespace);

export const extractDnsData = async (context: APIContext): Promise<FeedData> => {
  const domain = getDomain(context.url.hostname);
  const entryName = `lux.${domain}`;
  const store = getStore(context);
  const fallback = { feed: null, primary_color: null };

  let result = await store.get(entryName);

  if (!result) {
    result = await getDnsRecords(entryName)
      .then(
        ([result]) => get(result, 'data', null),
        () => null
      )
      .then((result) => {
        if (!result) {
          return null;
        }

        try {
          return atob(result.replace(/['"]+/g, ''));
        } catch (err) {
          return null;
        }
      });
  }

  if (!result) {
    result = JSON.stringify(fallback);
  }

  store.put(entryName, result, { expirationTtl: 60 * 60 });

  return safeParse<FeedData>(result, fallback);
};
