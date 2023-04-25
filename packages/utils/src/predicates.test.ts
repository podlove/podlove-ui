import { describe, test, expect } from 'vitest';
import { or, and, not, isUndefined, isUndefinedOrNull, isDefinedAndNotNull } from './predicates'

describe('predicates', () => {
  const pTrue = () => true
  const pFalse = () => false

  test('should have a "or" statement', () => {
    expect(or(pTrue, pTrue, 'test')).toEqual(true)
    expect(or(pTrue, pFalse, 'test')).toEqual(true)
    expect(or(pFalse, pTrue, 'test')).toEqual(true)
    expect(or(pFalse, pFalse, 'test')).toEqual(false)
  })

  test('should have a "and" statement', () => {
    expect(and(pTrue, pTrue, 'test')).toEqual(true)
    expect(and(pTrue, pFalse, 'test')).toEqual(false)
    expect(and(pFalse, pTrue, 'test')).toEqual(false)
    expect(and(pFalse, pFalse, 'test')).toEqual(false)
  })

  test('should have a "not" statement', () => {
    expect(not(pTrue, 'test')).toEqual(false)
    expect(not(pFalse, 'test')).toEqual(true)
  })

  test('should have a "isUndefined" statement', () => {
    expect(isUndefined('foo')).toEqual(false)
    expect(isUndefined(undefined)).toEqual(true)
  })

  test('should have a "isUndefinedOrNull" statement', () => {
    expect(isUndefinedOrNull('foo')).toEqual(false)
    expect(isUndefinedOrNull(undefined)).toEqual(true)
    expect(isUndefinedOrNull(null)).toEqual(true)
  })

  test('should have a "isDefinedAndNotNull" statement', () => {
    expect(isDefinedAndNotNull('foo')).toEqual(true)
    expect(isDefinedAndNotNull(undefined)).toEqual(false)
    expect(isDefinedAndNotNull(null)).toEqual(false)
  })
})
