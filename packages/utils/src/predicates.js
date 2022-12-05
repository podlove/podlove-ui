import { isNil } from 'ramda'

export const or = (p1, p2) => (x) => p1(x) || p2(x)
export const and = (p1, p2) => (x) => p1(x) && p2(x)
export const not = (p) => (x) => !p(x)
export const isUndefined = (x) => x === undefined

export const isUndefinedOrNull = or(isUndefined, isNil)
export const isDefinedAndNotNull = not(isUndefinedOrNull)
