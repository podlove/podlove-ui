/**
 * Share tab
 */
export interface PodloveWebPlayerShare {
  /**
   * Share Channels:
   * - list of available channels in share tab
   */
  channels: string[];
  // share outlet, if not provided embed snippet is not available
  outlet: string;
  sharePlaytime: true;
}
