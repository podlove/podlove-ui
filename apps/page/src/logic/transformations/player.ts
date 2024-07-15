import type { PodloveWebPlayerEpisode } from '@podlove/types';
import { toHumanTime } from '@podlove/utils/time';
import type { Episode, Show } from '../../types/feed.types';

export const toPlayerEpisode = (episode: Episode, show: Show): PodloveWebPlayerEpisode => ({
  version: 6,
  show: {
    link: show.link,
    poster: show.poster,
    subtitle: show.description,
    title: show.title,
    summary: show.summary
  },
  title: episode.title || '',
  subtitle: episode.subtitle || '',
  summary: episode.description || '',
  audio: episode.audio,
  publicationDate: episode.publicationDate || '',

  duration: toHumanTime(episode.duration || 0),
  poster: episode.poster || '',
  link: episode.link || '',
  chapters: episode.chapters
});
