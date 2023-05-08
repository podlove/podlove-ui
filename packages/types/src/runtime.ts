export type PodloveWebPlayerMode  = 'embed' | 'native';

export interface PodloveRuntime {
  display?: string;
  browser?: string;
  locale?: string;
  platform?: string;
  language?: string;
  version?: string;
}
