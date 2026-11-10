import { describe, expect, it } from 'vitest';
import { stepForKey, swipeStep, wrapIndex } from './navigation';

describe('wrapIndex', () => {
  it('wraps past the end back to the start', () => {
    expect(wrapIndex(5, 5)).toBe(0);
  });

  it('wraps before the start to the end', () => {
    expect(wrapIndex(-1, 5)).toBe(4);
  });

  it('returns 0 for an empty carousel', () => {
    expect(wrapIndex(3, 0)).toBe(0);
  });
});

describe('stepForKey', () => {
  it('maps arrow keys to previous and next', () => {
    expect(stepForKey('ArrowLeft')).toBe(-1);
    expect(stepForKey('ArrowRight')).toBe(1);
  });

  it('ignores other keys', () => {
    expect(stepForKey('Enter')).toBe(0);
  });
});

describe('swipeStep', () => {
  it('goes next on a left swipe beyond the threshold', () => {
    expect(swipeStep(300, 200)).toBe(1);
  });

  it('goes previous on a right swipe beyond the threshold', () => {
    expect(swipeStep(100, 200)).toBe(-1);
  });

  it('ignores small movements so taps still open the lightbox', () => {
    expect(swipeStep(100, 120)).toBe(0);
  });
});
