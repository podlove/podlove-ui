import { CLIENTS } from "./index.js";

export interface PodcastClient {
  title: string | null;
  scheme: (feed: string) => string | null;
  icon: string | null;
  install?: string | null;
  service?: string;
  type: PodcastClientType | null;
  platform: PodcastPlatform | null;
}

export type PodcastPlatform = typeof platform[keyof typeof platform];
export type PodcastClientType = typeof type[keyof typeof type];
export type PodcatcherClientId = keyof typeof CLIENTS;

export const type = {
  service: 'service',
  app: 'app'
};

export const platform = {
  android: 'android',
  ios: 'ios',
  osx: 'osx',
  windows: 'windows',
  unix: 'unix',
  web: 'web',
  custom: 'custom'
};

export const client = ({
  title = null,
  scheme = () => null,
  icon = null,
  install = null,
  type = null,
  platform = null
}: PodcastClient): PodcastClient => ({
  title,
  scheme,
  icon,
  install,
  type,
  platform
});
