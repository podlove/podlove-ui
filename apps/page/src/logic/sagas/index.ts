import sagasEngine from '@podlove/player-sagas/middleware';

import { selectors } from '../store';
import dataSagas from './data.sagas';

export function createSideEffects() {
  const sagas = [dataSagas({ selectInitializedApp: selectors.runtime.initialized })];
  sagasEngine.run(...sagas);
}
