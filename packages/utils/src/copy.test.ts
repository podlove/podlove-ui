import { describe, test, expect, vi } from 'vitest';

import copy from './copy.js';

const clipboardMock = {
  writeText: vi.fn()
};

vi.stubGlobal('navigator', { clipboard: clipboardMock });
// (global.navigator as any).clipboard =
//   clipboardMock;

describe('copy', () => {
  test('should copy text to clipboard', () => {
    const text = 'Test Text';
    copy(text);
    expect(clipboardMock.writeText).toHaveBeenCalledTimes(1);
    expect(clipboardMock.writeText).toHaveBeenCalledWith(text);
  });

  test('should log a warning when clipboard is not implemented', () => {
    vi.stubGlobal('navigator', { clipboard: null });
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    copy('Test Text');
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(`Clipboard copy isn't implemented`);
    consoleWarnSpy.mockRestore();
  });
});
