/**
 * Share tab
 */
export interface PodloveWebPlayerShare {
  /**
   * Share Channels:
   * - list of available channels in share tab
   */
  channels: PodloveWebPlayerChannel[];
  // share outlet, if not provided embed snippet is not available
  outlet: string;
  sharePlaytime: true;
}

export type PodloveWebPlayerChannel =
  | 'embed'
  | 'facebook'
  | 'linkedin'
  | 'mail'
  | 'reddit'
  | 'twitter'
  | 'xing'
  | 'whats-app'
  | 'pinterest'
  | 'link';

export type PodloveWebPlayerContent = 'show' | 'episode' | 'chapter' | 'time';
