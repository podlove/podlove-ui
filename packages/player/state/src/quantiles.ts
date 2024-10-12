import { Action, handleActions } from 'redux-actions';
import { head, findIndex } from 'lodash-es';

import {
  loadQuantiles,
  loadQuantilesPayload,
  setQuantiles,
  setQuantilesPayload
} from '@podlove/player-actions/quantiles';

const findQuantile = (quantiles: State = [], start: number): number =>
  findIndex(quantiles, (quantile) => head(quantile) === start);

const newQuantile = (quantiles: State = [], quantile: [number, number]): State => [
  ...quantiles,
  quantile
];

const updateQuantile = (quantiles: State = [], index, quantile): State => [
  ...quantiles.slice(0, index),
  quantile,
  ...quantiles.slice(index + 1)
];

export type State = [number, number][];

export const INITIAL_STATE: State = [];

export const reducer = handleActions<State, loadQuantilesPayload | setQuantilesPayload>(
  {
    [loadQuantiles.toString()]: (_state, { payload }: Action<loadQuantilesPayload>) => payload,
    [setQuantiles.toString()]: (state, { payload }: Action<setQuantilesPayload>) => {
      const index = findQuantile(state, payload.start);
      const currentQuantile: [number, number] = [payload.start, payload.end];

      if (index < 0) {
        return newQuantile(state, currentQuantile);
      }

      return updateQuantile(state, index, currentQuantile);
    }
  },
  INITIAL_STATE
);

export const selectors = {
  quantiles: (state: State) => state
};
