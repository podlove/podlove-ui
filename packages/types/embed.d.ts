import type { podlovePlayer } from './web-player';

declare global {
  interface Window {
    podlovePlayer?: podlovePlayer
  }
}