import { select } from 'redux-saga/effects';
import serviceWorker from '../../../service-worker.js?worker';

export default ({
  selectFeed,
  selectCacheKey
}: {
  selectFeed: (input: any) => string | null;
  selectCacheKey: (input: any) => string | null;
}) => {
  function* registerServiceWorker() {
    const serviceWorkerAvailable = 'serviceWorker' in navigator;

    if (!serviceWorkerAvailable) {
      return;
    }

    const feed: string = yield select(selectFeed);
    const cacheKey: string = yield select(selectCacheKey);
    const baseUrl = new URL(document.location.href);

    const serviceWorkerUrl = `${baseUrl.origin}${serviceWorker}?feed=${feed}&cacheKey=${cacheKey}`;

    try {
      const registration: ServiceWorkerRegistration = yield navigator.serviceWorker.register(
        serviceWorkerUrl,
        {
          scope: '/'
        }
      );

      // auto check for updates
      registration.update();
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }

  return function* () {
    if(import.meta.env.MODE === 'production') {
    yield registerServiceWorker();
    }
  };
};
