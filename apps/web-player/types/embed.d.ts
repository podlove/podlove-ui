import type podlovePlayer from './player';

declare global {
  interface Window {
    podlovePlayer?: typeof podlovePlayer
  }
}
