// typings
import { Store } from 'redux';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      bootstrap(template: string, stateFragments?: any[]): Promise<Store>;
      query(selector: string, ...query: string[]): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
