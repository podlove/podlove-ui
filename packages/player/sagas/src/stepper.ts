import { takeEvery, select, put } from 'redux-saga/effects';
import { min, max } from 'lodash-es';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import * as stepper from '@podlove/player-actions/stepper';

export const stepperSaga = ({
  selectDuration,
  selectPlaytime,
  selectLivesync
}: {
  selectDuration: (input: any) => number;
  selectPlaytime: (input: any) => number;
  selectLivesync: (input: any) => number;
}) =>
  function* saga() {
    yield takeEvery(stepper.stepForward.toString(), stepForward, {
      selectDuration,
      selectPlaytime,
      selectLivesync
    });
    yield takeEvery(stepper.stepBackwards.toString(), stepBackward, { selectPlaytime });
  };

export function* stepForward({
  selectDuration,
  selectPlaytime,
  selectLivesync
}: {
  selectDuration: (input: any) => number;
  selectPlaytime: (input: any) => number;
  selectLivesync: (input: any) => number;
}) {
  const duration = yield select(selectDuration);
  const playtime = yield select(selectPlaytime);
  const livesync = yield select(selectLivesync);

  const upperLimit = livesync > 0 ? livesync : duration;

  const targetPlaytime = min([playtime + 30 * 1000, upperLimit]);
  yield put(requestPlaytime(targetPlaytime));
}

export function* stepBackward({ selectPlaytime }: { selectPlaytime: (input: any) => number }) {
  const playtime = yield select(selectPlaytime);
  const targetPlaytime = max([playtime - 15 * 1000, 0]);
  yield put(requestPlaytime(targetPlaytime));
}
