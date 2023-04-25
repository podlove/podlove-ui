export default function throttle(callback: Function, wait: number, immediate: boolean = false) {
  let timeout: number | null = null;
  let initialCall = true;

  return function (): void {
    const callNow = immediate && initialCall;
    const next = () => {
      callback.apply(this, arguments);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(next, wait) as unknown as number;
    }
  };
}
