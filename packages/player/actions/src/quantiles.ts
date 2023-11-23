import { createAction } from 'redux-actions'
import { SET_QUANTILE, LOAD_QUANTILES } from './types.js'

export type setQuantilesPayload = { start: number; end: number; };
export type loadQuantilesPayload = [number, number][];

export const setQuantiles = createAction<setQuantilesPayload>(SET_QUANTILE)
export const loadQuantiles = createAction<loadQuantilesPayload>(LOAD_QUANTILES)
