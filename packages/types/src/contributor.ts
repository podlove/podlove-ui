export interface PodloveWebPlayerContributor {
  id: string;
  name: string;
  avatar: string;
  role: {
    id: string;
    slug: string;
    title: string;
  };
  group: {
    id: string;
    slug: string;
    title: string;
  };
  comment?: null | string;
}
