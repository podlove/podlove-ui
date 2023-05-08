import { compose, prop, propOr } from 'ramda';
import type {
  PodloveSubscribeButtonClient,
  PodloveSubscribeButtonConfig,
  PodloveTheme,
  PodloveRuntime
} from '@podlove/types';

export const feed = prop('feed') as (input: PodloveSubscribeButtonConfig) => string;
export const clients = propOr([], 'clients') as (
  input: PodloveSubscribeButtonConfig
) => PodloveSubscribeButtonClient[];
export const theme = propOr({}, 'theme') as (
  input: PodloveSubscribeButtonConfig & { theme: PodloveTheme }
) => PodloveTheme;

export const runtime = propOr({}, 'runtime') as (
  input: PodloveSubscribeButtonConfig & { runtime: PodloveRuntime }
) => PodloveRuntime;

export const language = compose(prop('language'), runtime) as (
  input: PodloveSubscribeButtonConfig & { runtime: PodloveRuntime }
) => string;
