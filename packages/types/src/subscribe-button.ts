import type { PodloveSubscribeButtonClient } from './client.js';
import { PodloveRuntime } from './runtime.js';
import { PodloveTheme } from './theme.js';

/**
 * Subscribe Button
 * - configuration for the subsscribe button overlay
 * - if not defined the subscribe button won't be rendered
 */
export interface PodloveSubscribeButtonConfig {
  feed: string; // Rss feed

  /**
   * Clients
   * - list of supported podcast clients on android, iOS, Windows, OSX
   * - only available clients on the used os/platform are shown
   * - order in list determines rendered order
   */
  clients: PodloveSubscribeButtonClient[];

  theme?: PodloveTheme;

  runtime?: PodloveRuntime;
}
