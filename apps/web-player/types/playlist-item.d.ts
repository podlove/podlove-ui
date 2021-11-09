/**
 * Playlist:
 * - can be a plain list or a reference to a json file
 * - if present playlist tab will be available
 */
export interface PodloveWebPlayerPlaylistItem {
  title: string;
  config: string;
  duration: string;
  active?: boolean;
}
