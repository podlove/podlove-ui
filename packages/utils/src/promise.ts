import { curry } from 'ramda';

export const delay = curry(
  <T>(time: number, data: T): Promise<T> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(data), time);
    })
);

export const waitFor = <T>(ref: () => T, timeout: number = 3000): Promise<T> => {
  const start = Date.now()
  const poll = (resolve, reject) => {
    const result = ref()

    if (typeof result !== 'undefined') {
      return resolve(result)
    }

    if (timeout <= Date.now() - start) {
      return reject()
    }

    requestAnimationFrame(poll.bind(this, resolve, reject))
  }

  return new Promise(poll)
}
