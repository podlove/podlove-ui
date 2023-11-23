import { mergeDeepRight } from 'ramda';
import { json } from '@podlove/utils/request';
import type { PodloveSubscribeButtonConfig } from '@podlove/types';

export default async (
  input: Partial<PodloveSubscribeButtonConfig> = {},
  additional: Partial<PodloveSubscribeButtonConfig> = {}
): Promise<PodloveSubscribeButtonConfig> => {
  let config;

  try {
    config = typeof input === 'string' ? await json(input) : input;
  } catch (err) {
    throw new Error(`Couldn't parse configuration "${input}"`);
  }

  return mergeDeepRight(config, additional) as PodloveSubscribeButtonConfig;
};
