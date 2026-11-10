import { describe, expect, it } from 'vitest';
import { relativeOffset, stepForKey, swipeStep, wrapIndex } from './navigation';

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

describe('relativeOffset', () => {
  it('is zero for the active item', () => {
    expect(relativeOffset(2, 2, 5)).toBe(0);
  });

  it('is negative for items to the left and positive to the right', () => {
    expect(relativeOffset(1, 2, 5)).toBe(-1);
    expect(relativeOffset(3, 2, 5)).toBe(1);
  });

  it('takes the shortest way around so the first item sits right of the last', () => {
    expect(relativeOffset(0, 4, 5)).toBe(1);
    expect(relativeOffset(4, 0, 5)).toBe(-1);
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
