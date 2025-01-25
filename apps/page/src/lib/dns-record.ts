import { get } from 'lodash-es';
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

export const extractDnsData = async (context: APIContext): Promise<FeedData> => {
  const domain = getDomain(context.url.hostname);
  const entryName = `lux.${domain}`;
  const fallback = { feed: null, primary_color: null };

  const result = await getDnsRecords(entryName)
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

  if (!result) {
    return fallback;
  }

  return safeParse<FeedData>(result, fallback);
};
