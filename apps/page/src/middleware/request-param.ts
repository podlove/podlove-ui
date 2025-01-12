import { defineMiddleware } from 'astro:middleware';
import { get } from 'lodash-es';
import { extractDnsData } from '../lib/dns-record';
import type { rgbColor } from '../types/color.types';

type RequestParams = {
  feed: string | undefined;
  episodeId: string | undefined;
  customDomain: boolean;
  primaryColor: rgbColor | undefined;
};

export const getRequestParams = (request: Request): RequestParams =>
  get(request, 'data') as unknown as RequestParams;

export const extractRequestParams = defineMiddleware(async (context, next) => {
  const { request, params } = context;
  const { feed, episodeId } = params;

  const dns = await extractDnsData(context);

  (request as any).data = {
    feed: dns.feed || feed,
    episodeId,
    customDomain: !!dns.feed,
    primaryColor: get(dns, 'primary_color', null)
  };

  return next();
});
