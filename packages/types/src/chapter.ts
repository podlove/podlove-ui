export interface PodloveWebPlayerChapter {
  start: number | null;
  duration?: number | null;
  end?: number | null;
  index: number;
  linkTitle?: string;
  image?: string;
  title?: string | null;
  href?: string | null;
  active?: boolean | null;
}
