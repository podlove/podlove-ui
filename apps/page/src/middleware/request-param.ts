import { defineMiddleware } from 'astro:middleware';
import { get } from 'lodash-es';
import { extractDnsData } from '../lib/dns-record';

export const getRequestParams = (
  request: Request
): { feed: string | undefined; episodeId: string | undefined; customDomain: boolean } => {
  const { feed, episodeId, customDomain } = get(request, 'data') as unknown as {
    feed: string;
    episodeId: string;
    customDomain: boolean;
  };

  return {
    feed,
    episodeId,
    customDomain
  };
};

export const extractRequestParams = defineMiddleware(async (context, next) => {
  const { request, params } = context;
  const { feed, episodeId } = params;

  const dns = await extractDnsData(context);

  (request as any).data = {
    feed: get(dns, 'feed', feed),
    episodeId,
    customDomain: !!dns,
    primaryColor: get(dns, 'primary_color', null)
  };

  return next();
});
