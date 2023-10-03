import { PodloveWebPlayerPlaylistItem } from './playlist-item.js';
import { PodloveSubscribeButtonConfig } from './subscribe-button.js';
import { PodloveWebPlayerShare } from './share.js';
import { PodloveTheme } from './theme.js';
import { PodloveWebPlayerTab } from './tab.js';
import { PodloveWebPlayerReference } from './reference.js';
import { PodloveWebPlayerFile } from './file.js';
import { PodloveWebPlayerFeatures } from './features.js';

export interface PodloveWebPlayerConfig {
  version: 5;

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
  playlist?: PodloveWebPlayerPlaylistItem[] | string;

  /** Share Tab */
  share?: PodloveWebPlayerShare;

  /** Files */
  files: PodloveWebPlayerFile[];

  /** Features */
  features?: PodloveWebPlayerFeatures;
}

export interface PodloveWebPlayerResolvedConfig extends PodloveWebPlayerConfig {
  reference: PodloveWebPlayerReference;
}
