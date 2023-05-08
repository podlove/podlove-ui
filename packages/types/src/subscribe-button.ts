import type { PodloveSubscribeButtonClient } from './client';

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
}
