import { isEqual } from 'lodash-es';
import type { Action } from 'redux-actions';
import { eventChannel } from 'redux-saga';
import { fork, take, call } from 'redux-saga/effects';

export const channel = (host) =>
  eventChannel((emitter) => {
    const pipe = (args) => {
      emitter(args || {});
    };

    host(pipe);

    return () => {};
  });

export const mediaControl =
  (
    event:
      | 'play'
      | 'pause'
      | 'seekbackward'
      | 'seekforward'
      | 'seekto'
      | 'skipad'
      | 'previoustrack'
      | 'nexttrack'
  ) =>
  (cb: MediaSessionActionHandler) =>
    navigator.mediaSession.setActionHandler(event, cb);

export const matchAction =
  (matchType: string, matchPayload: any) =>
  ({ type, payload }: Action<any>) =>
    type === matchType && isEqual(matchPayload, payload);

export function* takeOnce(pattern: string, saga: (...args: any[]) => any, ...args: any[]) {
  return yield fork(function* once() {
    let done = false;
    while (!done) {
      const action = yield take(pattern);
      done = true;
      yield call(saga, ...args.concat(action));
    }
  });
}
