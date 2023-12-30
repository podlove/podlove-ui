export interface Podcast {
  show: Show;
  episodes: Episode[];
  hosts: Person[];
}

export interface Show {
  title: string;
  description: string;
  link: string;
  image: string;
  summary: string;
}

export interface Episode {
  id: string;
  title: string | null;
  publicationDate: string | null;
  description: string | null;
  subtitle: string | null;
  duration: number | null;
  content: string | null;
  contributors: Person[];
  poster: string;
}

export interface Person {
  name: string | null;
  role: string | null;
  image: string | null;
  id: string | null;
  slug: string | null;
}
