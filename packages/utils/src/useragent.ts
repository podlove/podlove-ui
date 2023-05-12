type OS = 'ios' | 'android' | 'osx' | 'unix' | 'windows';

export const getPlatform = (): OS => {
  const userAgent = window.navigator.userAgent;

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'ios';
  }

  if (/Android/i.test(userAgent)) {
    return 'android';
  }

  if (/Mac/i.test(userAgent)) {
    return 'osx';
  }

  if (/Linux/i.test(userAgent) || /OpenBSD/i.test(userAgent) || /FreeBSD/i.test(userAgent) || /NetBSD/i.test(userAgent)) {
    return 'unix';
  }

  if (/Win/i.test(userAgent)) {
    return 'windows';
  }
};
