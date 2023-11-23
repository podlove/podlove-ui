// typings
import { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      embed(
        {
          episode,
          config,
          variant,
          template,
          templateUrl,
        }: {
          episode: string | PodloveWebPlayerEpisode;
          config: string | PodloveWebPlayerConfig;
          variant?: string;
          template?: string;
          templateUrl?: string;
        },
        params?: { [key: string]: string | number | boolean }
      ): Promise<{ player: { app: any; store: any }; subscribeButton: { app: any; store: any } }>;

      setup(): Promise<void>;

      query(selector: string): Chainable<JQuery<HTMLElement>>;

      share(
        data: {
          episode: string;
          config: string;
        },
        params?: { [key: string]: string | number | boolean }
      ): Promise<{ app: any; store: any }>;
    }
  }
}

export {};
