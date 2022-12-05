import { or, and, not, isUndefined, isUndefinedOrNull, isDefinedAndNotNull } from './predicates'

describe('predicates', () => {
  const pTrue = () => true
  const pFalse = () => false

  it('should have a "or" statement', () => {
    expect(or(pTrue, pTrue)()).toEqual(true)
    expect(or(pTrue, pFalse)()).toEqual(true)
    expect(or(pFalse, pTrue)()).toEqual(true)
    expect(or(pFalse, pFalse)()).toEqual(false)
  })

  it('should have a "and" statement', () => {
    expect(and(pTrue, pTrue)()).toEqual(true)
    expect(and(pTrue, pFalse)()).toEqual(false)
    expect(and(pFalse, pTrue)()).toEqual(false)
    expect(and(pFalse, pFalse)()).toEqual(false)
  })

  it('should have a "not" statement', () => {
    expect(not(pTrue)()).toEqual(false)
    expect(not(pFalse)()).toEqual(true)
  })

  it('should have a "isUndefined" statement', () => {
    expect(isUndefined('foo')).toEqual(false)
    expect(isUndefined(undefined)).toEqual(true)
  })

  it('should have a "isUndefinedOrNull" statement', () => {
    expect(isUndefinedOrNull('foo')).toEqual(false)
    expect(isUndefinedOrNull(undefined)).toEqual(true)
    expect(isUndefinedOrNull(null)).toEqual(true)
  })

  it('should have a "isDefinedAndNotNull" statement', () => {
    expect(isDefinedAndNotNull('foo')).toEqual(true)
    expect(isDefinedAndNotNull(undefined)).toEqual(false)
    expect(isDefinedAndNotNull(null)).toEqual(false)
  })
})
