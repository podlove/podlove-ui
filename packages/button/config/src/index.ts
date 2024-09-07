import { get } from 'lodash-es';
import type {
  PodloveSubscribeButtonClient,
  PodloveSubscribeButtonConfig,
  PodloveTheme,
  PodloveRuntime
} from '@podlove/types';

export const feed = (input: PodloveSubscribeButtonConfig): string => get(input, 'feed');
export const clients = (input: PodloveSubscribeButtonConfig): PodloveSubscribeButtonClient[] =>
  get(input, 'clients', []);
export const theme = (input: PodloveSubscribeButtonConfig): PodloveTheme => get(input, 'theme', {} as PodloveTheme);
export const runtime = (input: PodloveSubscribeButtonConfig): PodloveRuntime =>
  get(input, 'runtime', {});

export const language = (input: PodloveSubscribeButtonConfig): string =>
  get(input, 'language', 'en');
