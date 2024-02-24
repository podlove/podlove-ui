import { select } from 'redux-saga/effects';

function* disableOverflow() {
  document.body.classList.add('overflow-hidden');
}

function* enableOverflow() {
  document.body.classList.remove('overflow-hidden');
}

export default function ({
  selectSubscribeOverlayVisible,
  selectSearchOverlayVisible
}: {
  selectSubscribeOverlayVisible: (input: any) => boolean;
  selectSearchOverlayVisible: (input: any) => boolean;
}) {
  return function* () {
    while (true) {
      const subscribeOverlayVisible: boolean = yield select(selectSubscribeOverlayVisible);
      const searchOverlayVisible: boolean = yield select(selectSearchOverlayVisible);

      if (subscribeOverlayVisible || searchOverlayVisible) {
        disableOverflow();
      } else {
        enableOverflow();
      }
    }
  };
}
