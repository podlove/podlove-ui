import type { PodloveWebPlayerConfig } from './config';
import type { PodloveWebPlayerEpisode } from './episode';
import type { PodloveWebPlayerStore } from './store';

/**
 * Podlove Player Factory
 *
 * Signature
 * * Selector can be a css selector or a dom node reference
 * * An iframe as the canvas is injected into the reference, encapsulating the player
 * * Configuration can be provided as a meta object or an url to the configuration json file
 * * Canvas width can be defined by the template
 * * Canvas height is adapted to players height
 *
 * Using a selector that matches multiple elements the player will be rendered in the first matching element.
 * The podlovePlayer returns a promise with a redux store as a result that can be used to change the player state from outside.
 *
 * @see https://docs.podlove.org/podlove-web-player/v5/usage
 *
 * @param selector - CSS selector or dom node
 * @param episode - Path to JSON episode or episode object
 * @param configuration - Path to JSON config or configuration object
 *
 * @returns store - Promise returning a redux store
 */
export type podlovePlayer = (
  selector: string | Node,
  episode: string | PodloveWebPlayerEpisode,
  configuration: string | PodloveWebPlayerConfig // URL to fetch the configuration or the plain config
) => Promise<PodloveWebPlayerStore>;
