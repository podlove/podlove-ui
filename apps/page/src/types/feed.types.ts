export interface Podcast {
  etag: string | null;
  buildDate: string | null;
  show: Show;
  episodes: Episode[];
  hosts: Person[];
  author: Author;
}

export interface Transcript {
  voice: string | null;
  speaker: string | null;
  start: number;
  end: number;
  text: string;
}

export interface Show {
  title: string;
  description: string;
  link: string;
  poster: string;
  summary: string;
}

export interface Audio {
  url: string;
  size: string;
  mimeType: string;
}

export interface Episode {
  id: number;
  title: string | null;
  publicationDate: string | null;
  description: string | null;
  subtitle: string | null;
  link: string | null;
  duration: number | null;
  content: string | null;
  contributors: Person[];
  poster: string;
  chapters: Chapter[];
  transcripts: Transcript[];
  audio: Audio[];
}

export interface Person {
  id: string;
  name: string;
  avatar?: string;
}

export interface Chapter {
  start: number | string | null;
  duration?: number | null;
  end?: number | null;
  image?: string | null;
  title?: string | null;
  href?: string | null;
}

export interface Author {
  owner: string | null;
  copyright: string | null;
  name: string | null;
  mail: string | null;
}
