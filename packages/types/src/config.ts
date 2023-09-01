import type { PodloveWebPlayerPlaylistItem } from './playlist-item';
import type { PodloveSubscribeButtonConfig } from './subscribe-button';
import type { PodloveWebPlayerShare } from './share';
import type { PodloveTheme } from './theme';
import type { PodloveWebPlayerTab } from './tab';
import type { PodloveWebPlayerReference } from './reference';
import type { PodloveWebPlayerFile } from './file';

export interface PodloveWebPlayerConfig {
  version: 5;

  /** player asset base path, falls back to ./ */
  base: string;

  /** default active tab, can be set to [none, shownotes, chapters, files, share, playlist] */
  activeTab?: PodloveWebPlayerTab;

  theme: PodloveTheme;

  /**
   * Subscribe Button
   * - configuration for the subscribe button overlay
   * - if not defined the subscribe button won't be rendered
   */
  'subscribe-button'?: PodloveSubscribeButtonConfig;

  /**
   * Playlist:
   * - can be a plain list or a reference to a json file
   * - if present playlist tab will be available
   */
  playlist?: PodloveWebPlayerPlaylistItem[];

  /** Share Tab */
  share?: PodloveWebPlayerShare;

  /** Files */
  files: PodloveWebPlayerFile[];

  /** Features */
  features?: {
    persistPlaystate?: boolean;
    persistTab?: boolean;
  }
}

export interface PodloveWebPlayerResolvedConfig extends PodloveWebPlayerConfig {
  reference: PodloveWebPlayerReference;
}
