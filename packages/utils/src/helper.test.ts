import { describe, test, expect, beforeEach, vi } from 'vitest';
import { inAnimationFrame, asyncAnimation, callWith } from './helper.js';

describe('helper', () => {
  beforeEach(() => {
    window.requestAnimationFrame = (cb) => cb();
  });

  describe('inAnimationFrame()', () => {
    test('it should be a function', () => {
      expect(typeof inAnimationFrame).toBe('function');
    });

    test(`calls a function on next animation frame`, () => {
      const testStub = vi.fn();

      inAnimationFrame(testStub)('foo', 'bar');
      expect(testStub).toHaveBeenCalledWith('foo', 'bar');
    });
  });

  describe('asyncAnimation()', () => {
    test('it should be a function', () => {
      expect(typeof asyncAnimation).toBe('function');
    });

    test(`returns a promise`, async () => {
      const result = asyncAnimation();
      expect(typeof result.then).toBe('function');
    });

    test(`resolves stub in promise`, async () => {
      const testStub = vi.fn();
      await asyncAnimation().then(() => testStub('foo', 'bar'));

      expect(testStub).toHaveBeenCalledWith('foo', 'bar');
    });
  });

  describe('callWith()', () => {
    test('it should be a function', () => {
      expect(typeof callWith).toBe('function');
    });

    test(`calls a function with given args`, () => {
      const testStub = vi.fn();

      callWith('foo', 'bar')(testStub);
      expect(testStub).toHaveBeenCalledWith('foo', 'bar');
    });
  });
});
