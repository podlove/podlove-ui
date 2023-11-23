/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { State as view } from '@podlove/button-state/view';
import type { State as clients } from '@podlove/button-state/clients';
import type { State as theme } from '@podlove/button-state/theme';
import type { State as finish } from '@podlove/button-state/finish';
import type { State as feed } from '@podlove/button-state/feed';
import type { State as runtime } from '@podlove/button-state/runtime';

export default interface State {
  view;
  clients;
  theme;
  finish;
  feed;
  runtime;
}
