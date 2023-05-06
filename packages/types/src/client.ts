export interface PodloveWebPlayerClient {
  id: string;
  /**
   * Service uuid, e.g. https://podcasts.apple.com/podcast/[service],
   * is needed if the podcast needs to be registered on the service and instead of the rss feed the service has its own service uuid
   */
  service?: string;
}
